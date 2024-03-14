import React from "react";
import { useSelector } from "react-redux";

function SearchPage() {
  const searchResults = useSelector((state) => state.search.results);
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Search Results</h1>
      {searchResults.map((result) => (
        <div key={result.id}>
          {/* Render each search result item */}
          <h2>{result.title}</h2>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
