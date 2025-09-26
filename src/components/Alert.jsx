export default function Alert({ color, message, handleCloseAlert }) {
  return (
    <>
      <div
        className="hidden bg-red-200 bg-green-200 text-red-600 text-green-600 border-red-600 border-green-600"
        id="initial-color-tailwindcss"
      ></div>
      <div
        className={`rounded-md p-4 bg-${color}-200 shadow-md mb-6 text-${color}-600 border-2 border-${color}-600 font-bold flex justify-between rounded-md`}
      >
        <span>{message}</span>
        <button
          className="text-xl hover:cursor-pointer hover:text-slate-600"
          onClick={handleCloseAlert}
        >
          X
        </button>
      </div>
    </>
  );
}
