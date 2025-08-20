import React from "react";

export default function SearchResults({ results, isLoading, query }) {
  if (isLoading) {
    return <div className="mt-6 text-center">Loading...</div>;
  }
  
  if (!query) {
    return <div className="mt-6 text-center text-gray-500">Enter a search term to begin</div>;
  }
  
  if (results.length === 0) {
    return <div className="mt-6 text-center text-gray-500">No results found for "{query}"</div>;
  }
  
  return (
    <div className="mt-6">
      <h3 className="font-bold mb-4">Results for "{query}"</h3>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="p-4 border rounded">
            <div className="font-semibold">{result.title}</div>
            <div className="text-sm text-gray-600">{result.subtitle}</div>
            <div className="mt-2 text-sm">{result.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

