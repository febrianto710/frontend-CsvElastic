export default function Dropdown({ selectedValue, options, handleSelect }) {
  return (
    <div>
      <select
        value={selectedValue}
        onChange={handleSelect}
        className="block px-3 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 hover:cursor-pointer w-full"
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
