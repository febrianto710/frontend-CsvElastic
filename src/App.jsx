import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Upload from "./pages/Upload.jsx";
import NotFound from "./pages/NotFound.jsx";
import RequireLogin from "./components/RequiredLogin.jsx";
import CsvUploader from "./pages/TestUpload.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test-upload" element={<CsvUploader />} />

        <Route
          path="upload"
          element={
            <RequireLogin>
              <Upload />
            </RequireLogin>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
