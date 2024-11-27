import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductGrid.css'; // Add styles for the grid

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Update the API endpoint based on your backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://vtex-backend.onrender.com/products'); // Adjust if running on a different host
                console.log('API Response:', response.data); // Inspect response structure
                setProducts(response.data); // Update state with fetched data
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className='product-slider-container'>
                <h1 className="product-heading">Occasion fashion</h1>
            </div>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.productId} className="product-card">
                        <img
                            src={product.items?.[0]?.images?.[0]?.imageUrl || 'default-image.jpg'}
                            alt={product.productName}
                            className="product-image"
                        />
                        <h3 className="product-name">{product.productName}</h3>
                        <p className="product-price">
                            {product.items?.[0]?.sellers?.[0]?.commertialOffer?.Price
                                ? `$${(product.items[0].sellers[0].commertialOffer.Price / 100).toFixed(2)}`
                                : 'Price not available'}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductGrid;
