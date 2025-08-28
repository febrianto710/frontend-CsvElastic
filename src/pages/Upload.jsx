import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Loading from "../components/Loading";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../config/settings";

function Upload() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleSpanClick = () => {
    fileInputRef.current?.click();
  };

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Belum ada file terpilih");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      // console.log(selectedFile);
      setFile(selectedFile);
      setStatus(selectedFile.name);
    } else {
      setStatus("Pilih file CSV yang valid!");
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = Cookies.get("token");
      const res = await axios.post(`${BASE_API_URL}/upload-csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

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

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <Navbar />
      <div className="px-4 pb-6">
        <h1 className="text-center mb-12 font-bold text-2xl">
          Upload File CSV
        </h1>
        <div
          className="hidden bg-red-600 bg-green-600"
          id="initial-color-tailwindcss"
        ></div>
        <div className="mx-auto w-[322px]  ">
          {showAlert ? (
            <div
              className={`w-full rounded-md p-4 bg-${alertColor}-600 shadow-md mb-6 text-white font-bold`}
            >
              {alertMessage}
            </div>
          ) : (
            ""
          )}
          <div className="flex w-fit">
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                className=" py-3 w-[200px] bg-slate-200 text-transparent rounded-md  hover:cursor-pointer hover:bg-slate-300"
                accept=".csv"
                onChange={handleFileChange}
              />
              <span
                onClick={handleSpanClick}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hover:cursor-pointer"
              >
                Pilih File
              </span>
            </div>

            <button
              className="bg-green-400 ms-4 px-8 font-bold rounded-md hover:cursor-pointer hover:bg-green-500"
              onClick={handleUpload}
            >
              Send
            </button>
          </div>
          <p className="w-[200px] truncate" title={status}>
            {status}
          </p>
        </div>
      </div>
    </>
  );
}

export default Upload;
