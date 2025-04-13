// src/pages/SearchResults.jsx

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SearchResults() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract the search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return;
      setLoading(true);

      try {
        // Replace this URL with your API endpoint to fetch search results
        const response = await fetch(`http://localhost:1337/api/products?filters[name][$contains]=${searchQuery}`);
        const data = await response.json();
        
        // Process the data as needed
        setSearchResults(data.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for {searchQuery}</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={`http://localhost:1337${item.image[0].url}`} alt={item.name} className="w-full h-64 object-cover mb-4 rounded" />
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found for {searchQuery}.</p>
      )}
    </div>
  );
}
