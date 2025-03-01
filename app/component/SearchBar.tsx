import React from "react";

const SearchBar = ({
  handleSearch,
}: {
  handleSearch: (searchTerm: string) => void;
}) => {
  return (
    <div className="flex justify-center items-center">
      {" "}
      <input
        type="text"
        placeholder="Search Pokemon..."
        className="input-glass text-black  outline-none w-5/6 bg-amber-50 md:w-3/6 p-3 mt-4 border rounded"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
