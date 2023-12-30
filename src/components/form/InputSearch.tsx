import { FC } from "react";

interface InputSearchProps {
  searchQuery: string;
  handleSearchChange: (event: any) => void;
}
const InputSearch: FC<InputSearchProps> = ({
  searchQuery,
  handleSearchChange,
}) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="p-2 border rounded"
    />
  );
};
export default InputSearch;
