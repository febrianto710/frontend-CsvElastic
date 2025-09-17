import React, { useState } from "react";
import * as aq from "arquero";
import axios from "axios";
import ProgressBarDemo from "../components/LoadingProgressBar";
import Loading from "../components/Loading";
import LoadingProgressBar from "../components/LoadingProgressBar";

export default function CsvUploader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // Helper sleep
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setProgress(0);

    // Baca file CSV jadi string
    const text = await file.text();
    if (text.includes(";")) {
      console.log("delimiter = ;");
    } else if (text.includes(",")) {
      console.log("delimiter = ,");
    }
    function cleanQuotes(line) {
      let cleaned = line.trim();
      if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.slice(1, -1); // buang kutip awal & akhir
      }
      return cleaned;
    }

    // Pecah per baris
    const lines = text.split("\n");

    // Bersihkan kutip awal & akhir
    const cleanedLines = lines.map((line) => cleanQuotes(line));

    // Gabungkan lagi jadi CSV string bersih
    const cleanedText = cleanedLines.join("\n");
    // Parse CSV pakai Arquero
    const df = aq.fromCSV(cleanedText, { delimiter: "," });
    const data = df.objects();

    // Tentukan batch size
    const batchSize = 10000;
    const total = data.length;
    let uploaded = 0;

    // Loop per batch
    for (let i = 0; i < total; i += batchSize) {
      const batch = data.slice(i, i + batchSize);

      // Simulasi proses upload dengan sleep 10 detik
      console.log(`Simulasi upload batch ${i / batchSize + 1}`);
      // await sleep(10000);
      let response = await axios.post("http://localhost:5000/test-upload", {
        data: batch,
      });
      console.log(response);
      // Update progress
      uploaded += batch.length;
      setProgress(Math.round((uploaded / total) * 100));
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />
      <LoadingProgressBar percent_number={20} />

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full text-xs text-white flex items-center justify-center"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
}
