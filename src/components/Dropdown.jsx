export default function Dropdown({ selectedValue, options, handleSelect }) {
  return (
    <div className=" my-4">
      <select
        value={selectedValue}
        onChange={handleSelect}
        className="block px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.view}
          </option>
        ))}
      </select>
    </div>
  );
}
