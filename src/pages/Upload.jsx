import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Loading from "../components/Loading";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, INDEX_TYPES } from "../config/settings";
import Dropdown from "../components/Dropdown";
import FileInput from "../components/FileInput";
// import * as aq from "arquero";
// import LoadingProgressBar from "../components/LoadingProgressBar";

// function cleanQuotes(line) {
//   let cleaned = line.trim();
//   if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
//     cleaned = cleaned.slice(1, -1); // buang kutip awal & akhir
//   }
//   let text_without_quote = cleaned.replace(/'/g, "");
//   return text_without_quote;
// }

function formatTime(date) {
  return date.toTimeString().split(" ")[0]; // ambil HH:MM:SS
}

function Upload() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [indexType, setIndexType] = useState(INDEX_TYPES[0]["value"]);
  // const [progress, setProgress] = useState(0);
  useEffect(() => {
    document.title = "Upload File";
  }, []);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // cek setiap 2 menit sekali apakah token sudah expired atau belum
  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp && decoded.exp <= currentTime) {
          // Token expired
          Cookies.remove("token");
          clearTimeout(timerRef.current);
          navigate("/");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("token");
        clearTimeout(timerRef.current);
        navigate("/");
      }
    };

    // Jalankan pengecekan pertama
    checkToken();

    // Set timeout untuk cek setiap 2 menit (120000 ms)
    timerRef.current = setInterval(checkToken, 120000);

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(timerRef.current);
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const extension = selectedFile.name.split(".").pop();

    if (selectedFile && extension === "csv") {
      // console.log(selectedFile);
      setFile(selectedFile);
      // setStatus(selectedFile.name);
    } else {
      setShowAlert(true);
      setAlertMessage("File harus bertipe csv");
      setAlertColor("red");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("index_type", indexType);

    try {
      const token = Cookies.get("token");

      const start = new Date();
      console.log("Start:", formatTime(start));

      const res = await axios.post(`${BASE_API_URL}/upload-csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const end = new Date();
      console.log("End:", formatTime(end));

      const durationSec = Math.round((end - start) / 1000);
      console.log(`Selesai dalam detik: ${durationSec} detik`);

      if (res.status == 200) {
        setShowAlert(true);
        setAlertMessage(res.data.message);
        setAlertColor("green");
      }

      setIsLoading(false);
    } catch (err) {
      setShowAlert(true);
      setAlertMessage(err?.response?.data?.error ?? err.message);
      setAlertColor("red");
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSelectIndexType = (event) => {
    setIndexType(event.target.value);
  };

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <Navbar />

      <div className="px-4 pb-24">
        <h1 className="text-center mb-12 font-bold text-2xl">
          Upload File CSV
        </h1>
        <div
          className="hidden bg-red-600 bg-green-600"
          id="initial-color-tailwindcss"
        ></div>

        <div className="mx-auto sm:w-[500px] ">
          {showAlert ? (
            <div
              className={`rounded-md p-4 bg-${alertColor}-600 shadow-md mb-6 text-white font-bold flex justify-between rounded-md`}
            >
              <span>{alertMessage}</span>
              <button
                className="text-xl hover:cursor-pointer hover:text-slate-200"
                onClick={handleCloseAlert}
              >
                X
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="border-2 border-slate-200 shadow-lg rounded-lg p-6 bg-sky-100">
            <div className="mb-4">
              <label className="mb-3 block">Jenis Data</label>
              <Dropdown
                options={INDEX_TYPES}
                selectedValue={indexType}
                handleSelect={handleSelectIndexType}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="" className="mb-3 block">
                File
              </label>
              <FileInput handleFileChange={handleFileChange} />
            </div>

            <button
              className="bg-green-500 mt-6 mb-4 py-3 items-center px-8 font-bold rounded-md hover:cursor-pointer hover:bg-green-600 w-full"
              onClick={handleUpload}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;
