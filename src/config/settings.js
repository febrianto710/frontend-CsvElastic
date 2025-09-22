const API_VERSION = "v1";
export const BASE_API_URL = `http://localhost:5000/api/${API_VERSION}`;

export const INDEX_TYPES = [
  { value: "employee", view: "Data Karyawan" },
  { value: "web portal", view: "Web Portal" },
  { value: "quota dukcapil", view: "Quota Dukcapil" },
];

export const REQUIRED_COLUMNS = {
  employee: [
    "EMP_KATEGORI",
    "JENJAB",
    "JNKEL",
    "JOB",
    "JOB_ID",
    "KDUNIT",
    "KDWIL",
    "MARITAL_STATUS",
    "NAMA",
    "NPP",
    "ORGANISASI",
    "ORGANIZATION_ID",
    "PERSON_ID",
    "POSISI",
    "TEMPAT_LAHIR",
    "TGL_ANGKAT",
    "TGL_LAHIR",
    "TGL_MASUK",
    "UNIT_BESARAN",
    "UNIT3",
  ],
  "web portal": [
    "@timestamp",
    "CHANNEL_ID",
    "CHANNEL_NAME",
    "IP ADDRESS",
    "NIK",
    "NOMINAL",
    "SERVICE",
    "STATUS",
    "TANGGAL",
    "TRX_ID",
    "UNIT",
    "USERNAME",
  ],
  "quota dukcapil": ["QUOTA", "SERVICE", "TANGGAL", "UNIT"],
};
