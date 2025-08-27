import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [npp, setNpp] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const token = Cookies.get("token");
  if (token) {
    return <Navigate to={"/upload"} />;
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        npp,
        password,
      });

      if (response.status == 200) {
        Cookies.set("token", response.data.token, { expires: 1, secure: true });
        navigate("/upload");
      }
    } catch (error) {
      setShowAlert(true);

      setAlertMessage(error?.response?.data?.error ?? error.message);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center font-bold text-2xl mb-6">Login</h1>

      <div className="w-[360px] sm:w-[600px]  mx-auto ">
        {showAlert ? (
          <div className="w-full rounded-md p-4 bg-red-400 shadow-md mb-6 text-white">
            {alertMessage}
          </div>
        ) : (
          ""
        )}

        <form onSubmit={handleSubmitForm}>
          <div className="p-6 border-2 border-slate-200 rounded-xl shadow-md">
            <div className="mb-6">
              <label htmlFor="NPP" className="block mb-3 font-bold">
                NPP
              </label>
              <input
                type="text"
                className="border-2 border-slate-500 px-6 py-4 rounded-2xl w-full"
                placeholder="Masukan NPP..."
                value={npp}
                onChange={(e) => setNpp(e.target.value)}
                required
              />
            </div>

            <div className="mb-10">
              <label htmlFor="NPP" className="block mb-3 font-bold">
                Password
              </label>
              <input
                type="password"
                className="border-2 border-slate-500 px-6 py-4 rounded-2xl w-full"
                placeholder="Masukan Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <button
                className="w-full rounded-2xl px-6 py-4 bg-sky-400 font-bold hover:cursor-pointer hover:bg-sky-500"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
