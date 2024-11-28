import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css'; // Assuming you add styles for the page.

const ProductPage = () => {
    const skuId = useParams().id;  // Get SKU ID from URL
    const [sku, setSku] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSku = async () => {
            try {
                const response = await axios.get(`https://vtex-backend.onrender.com/sku/${skuId}`);
                setSku(response.data);
            } catch (err) {
                console.error('Error fetching SKU:', err);
                setError('Error fetching SKU');
            } finally {
                setLoading(false);
            }
        };

        fetchSku();
    }, [skuId]);

    // Loader Spinner
    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Retrieve image URL from the Images array if available
    const imageUrl = sku?.Images?.[0]?.ImageUrl || 'default-image.jpg'; // Default image if none found

    return sku ? (
        <div className="single_product-page-container">
            <div className="single_product-header">
                {/* <h1>{sku.NameComplete || 'Product Name Not Available'}</h1> */}
            </div>
            <div className="single_product-details">
                <div className="single_product-image">
                    <img
                        src={imageUrl}
                        alt={sku.NameComplete || 'SKU Image'}
                        className="single_product-img"
                    />
                </div>
                <div className="single_product-info">
                    <h1>{sku.NameComplete || 'Product Name Not Available'}</h1>

                    <p className="single_product-description">
                        {sku.ProductDescription || 'No description available'}
                    </p>
                    <p className="single_product-price">
                        Price: {sku.SkuSellers[0]?.Price ? `$${(sku.SkuSellers[0].Price / 100).toFixed(2)}` : `${0}`}
                    </p>
                </div>
            </div>
        </div>
    ) : (
        <div className="not-found-message">SKU not found</div>
    );
};

export default ProductPage;
