import React, { useState } from "react";

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <div>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label" fill="none">
              Search
            </span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleChange}
          />
        </form>
      </header>
    </div>
  );
};

export default Searchbar;
