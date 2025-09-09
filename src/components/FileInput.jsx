import React, { useState } from "react";

export default function FileInput({ handleFileChange }) {
  const [fileName, setFileName] = useState("Belum ada file dipilih");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Belum ada file dipilih");
    }

    handleFileChange(e);
  };

  return (
    <div
      className="flex items-center border rounded-lg p-2 gap-3 bg-white"
      // style={{ width: "400px" }}
    >
      <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 whitespace-nowrap">
        Pilih File
        <input
          type="file"
          onChange={handleChange}
          className="hidden"
          accept=".csv"
        />
      </label>
      <span className="text-sm text-gray-700 truncate" title={fileName}>
        {fileName}
      </span>
    </div>
  );
}
