import { useState } from "react";

function Search({ filterProductHandler }) {
  const [char, setChar] = useState("");

  const handleSearch = (event) => {
    setChar(event.target.value);
    filterProductHandler(event.target.value);
  };

  return (
    <div className="search-bar">
      <label>
        Search:
        <input
          value={char}
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Search by category"
        />
      </label>
    </div>
  );
}

export default Search;