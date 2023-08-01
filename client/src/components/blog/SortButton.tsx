type OptionSort = {
  name: string;
  value: number;
};

const options: OptionSort[] = [
  {
    name: "newset",
    value: -1,
  },
  {
    name: "oldset",
    value: 1,
  },
];

type SortButtonProps = {
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SortButton = ({ handleFilterChange }: SortButtonProps) => {
  return (
    <div>
      <div className="px-4 py-2 border border-gray-900 rounded-lg">
        <label htmlFor="filter blog">Sort by: </label>
        <select
          className="capitalize focus:outline-none"
          onChange={handleFilterChange}
        >
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortButton;
