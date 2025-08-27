import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Loading from "../components/Loading";

function Upload() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSpanClick = () => {
    fileInputRef.current?.click();
  };

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Belum ada file terpilih");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      console.log(selectedFile);
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
      const res = await axios.post(
        "http://localhost:5000/upload-csv",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status == 200) {
        setShowAlert(true);
        setAlertMessage(res.data.message);
        setAlertColor("green");
      }

      setIsLoading(false);
    } catch (err) {
      setShowAlert(true);
      setAlertMessage(err.response.data.error);
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

        <div className="mx-auto w-[322px]  ">
          {showAlert ? (
            <div
              className={`w-full rounded-md p-4 bg-${alertColor}-400 shadow-md mb-6 text-white`}
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
