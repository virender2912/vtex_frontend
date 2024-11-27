import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CollectionProduct.css'; // Add styles for the grid

const CollectionProductGrid = () => {
    const [collectionproducts, setCollectionProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Update the API endpoint based on your backend
        const fetchCollectionProducts = async () => {
            try {
                const response = await axios.get('https://vtex-backend.onrender.com/collectionProduct');
                console.log('API Response:', response); // Log the entire response

                // Check if 'Data' key exists and is an array
                if (Array.isArray(response.data.Data)) {
                    setCollectionProducts(response.data.Data); // Set the 'Data' array
                } else {
                    setError('Data is not an array');
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="collection-product-grid">
            {/* Ensure collectionproducts is an array before calling .map() */}
            {Array.isArray(collectionproducts) && collectionproducts.length > 0 ? (
                collectionproducts.map(collectionproduct => (
                    <div key={collectionproduct.ProductId} className="collection-product-card">
                        {/* <h3 className="collectionproduct-name">{collectionproduct.ProductName}</h3> */}
                        <img
                            src={collectionproduct.SkuImageUrl}
                            alt={collectionproduct.ProductName}
                            className="collectionproduct-image"
                        />
                    </div>
                ))
            ) : (
                <div>No products found in this collection.</div>
            )}
        </div>
    );
};

export default CollectionProductGrid;
