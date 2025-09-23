import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [npp, setNpp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorsForm, setErrorsForm] = useState({});
  useEffect(() => {
    document.title = "Register";
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const errors = {};
    if (fullName.length < 3) {
      errors.fullName = "Full name field must be more than 2 characters";
    }

    if (npp.length < 3) {
      errors.npp = "NPP field must be more than 2 characters";
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      errors.email = "Email format is not valid";
    }

    if (password.length < 6) {
      errors.password = "Password field must be more than 5 characters";
    }

    if (confirmPassword != password) {
      errors.confirmPassword = "Confirm password and password dont match";
    }

    if (Object.keys(errors).length === 0) {
      setErrorsForm({});
      console.log("valid");
    } else {
      console.log(errors);
      setErrorsForm(errors);
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <Navbar />

      <h1 className="text-center font-bold text-2xl mb-6">Register</h1>

      <div className="w-[360px] sm:w-[500px]  mx-auto mb-12">
        {showAlert ? (
          <div className="w-full rounded-md p-4 bg-red-400 shadow-md mb-6 text-white font-bold">
            {alertMessage}
          </div>
        ) : (
          ""
        )}

        <form onSubmit={handleSubmitForm}>
          <div className="p-6 border-2 border-slate-200 rounded-xl shadow-lg">
            <div className="mb-6">
              <label htmlFor="fullName" className="block mb-3 font-bold">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="border-2 border-slate-500 px-6 py-4 rounded-2xl w-full"
                placeholder="Masukan Nama Lengkap Anda..."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {errorsForm.fullName ? (
                <small className="text-red-500">{errorsForm.fullName}</small>
              ) : (
                ""
              )}
            </div>
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
              {errorsForm.npp ? (
                <small className="text-red-500">{errorsForm.npp}</small>
              ) : (
                ""
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="NPP" className="block mb-3 font-bold">
                Email
              </label>
              <input
                type="email"
                className="border-2 border-slate-500 px-6 py-4 rounded-2xl w-full"
                placeholder="Masukan Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorsForm.email ? (
                <small className="text-red-500">{errorsForm.email}</small>
              ) : (
                ""
              )}
            </div>

            <div className="mb-6">
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
              {errorsForm.password ? (
                <small className="text-red-500">{errorsForm.password}</small>
              ) : (
                ""
              )}
            </div>

            <div className="mb-10">
              <label htmlFor="NPP" className="block mb-3 font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                className="border-2 border-slate-500 px-6 py-4 rounded-2xl w-full"
                placeholder="Konfirmasi Password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errorsForm.confirmPassword ? (
                <small className="text-red-500">
                  {errorsForm.confirmPassword}
                </small>
              ) : (
                ""
              )}
            </div>

            <div className="mb-4">
              <button
                className="w-full rounded-2xl px-6 py-4 bg-sky-600 font-bold hover:cursor-pointer hover:bg-sky-700 text-white"
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
        </form>

        <p className="my-8">
          Already have an account?{" "}
          <Link
            to={"/"}
            className="text-blue-500 hover:cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
