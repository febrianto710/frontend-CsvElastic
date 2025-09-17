export default function LoadingProgressBar({ percent_number }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full p-4 max-w-md mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className="bg-green-500 h-6 text-white text-xs flex items-center justify-center transition-all duration-300"
            style={{ width: `${percent_number}%` }}
          >
            {percent_number}%
          </div>
        </div>
      </div>
    </div>
  );
}
