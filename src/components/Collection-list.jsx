import React, { useEffect, useState } from 'react';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from the backend
    fetch('http://localhost:3001/post') // Make sure this matches your backend URL
    .then((response) => response.json())
    .then((data) => {
      // Simulating category names from post titles
      const formattedData = data.slice(0, 5).map((item) => ({
        id: item.id,
        name: item.title,
      }));
      setCategories(formattedData);
    })
    .catch((err) => setError(err.message));
}, []);

  return (
    <div>
      <h1>Homepage - Categories</h1>

      {/* Show error message if there is an error */}
    

      {/* Show loading message while data is being fetched */}
      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <ul>
          {/* Render categories */}
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id}>{category.name}</li>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Categories;
