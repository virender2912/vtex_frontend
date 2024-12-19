import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductGrid.css';

// Custom Next Arrow
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: '#fff', color: '#fff', borderRadius: '50%' }}
            onClick={onClick}
        >
            &rarr;
        </div>
    );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: '#fff', color: '#fff', borderRadius: '50%' }}
            onClick={onClick}
        >
            &larr;
        </div>
    );
};

const ProductGrid = ({ myId }) => {
    const [collectionProducts, setCollectionProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const collectionId = myId || 138;

    useEffect(() => {
        const fetchCollectionProducts = async () => {
            try {
                // const collectionResponse = await axios.get(`http://localhost:3000/collectionProduct?collectionId=${collectionId}`);
                const collectionResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/collectionProduct?collectionId=${collectionId}`);
                if (Array.isArray(collectionResponse.data.Data)) {
                    const products = collectionResponse.data.Data;

						// Fetch pricing for each product's SkuId
						const productsWithPrices = await Promise.all(
							products.map(async (product) => {
								try {
									// const priceResponse = await axios.get(`http://localhost:3000/pricing/${product.SkuId}`);
									const priceResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/pricing/${product.SkuId}`);
									console.log(`Price for SkuId ${product.SkuId}:`, priceResponse.data.basePrice);

									return { ...product, basePrice: priceResponse.data.basePrice || 0 }; // Include basePrice or default to 0
								} catch (error) {
									console.error(`Error fetching price for SkuId ${product.SkuId}:`, error);
									return { ...product, basePrice: 0 }; // Default basePrice to 0 on error
								}
							})
						);

						setCollectionProducts(productsWithPrices);
                } else {
                    setError('Invalid response format from collection API');
                }
            } catch (err) {
                console.error('Error fetching collection products:', err);
                setError('Failed to fetch collection products');
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionProducts();
    }, [collectionId]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="collection-product-container">
            <h1 className="product-heading">New Products</h1>
            {/* Conditionally render the slider if there are more than 3 products */}
            {collectionProducts.length > 2 ? (
                <Slider {...sliderSettings}>
                    {collectionProducts.map((product) => (
                        <div key={product.SkuId} className="product-slider-item">
                            <Link to={`/product/${product.SkuId}`}>
                                <div className="product-card">
                                    <img
                                        src={product.SkuImageUrl || 'default-image.jpg'}
                                        alt={product.ProductName}
                                        className="product-image"
                                    />
                                    <h3 className="product-name">{product.ProductName}</h3>
                                    <p className="product-price">
                                        {product.basePrice
                                            ? `$${(product.basePrice / 100).toFixed(2)}`
                                            : 'N/A'}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="product-grid">
                    {collectionProducts.map((product) => (
                        <Link key={product.SkuId} to={`/product/${product.SkuId}`} className="product-card-link">
                            <div className="product-card">
                                <img
                                    src={product.SkuImageUrl || 'default-image.jpg'}
                                    alt={product.ProductName}
                                    className="product-image"
                                />
                                <h3 className="product-name">{product.ProductName}</h3>
                               <p className="product-price">
                                    {product.basePrice ? `$${(product.basePrice / 100).toFixed(2)}` : '0'}
                                    {/* {price ? `$${(price / 100).toFixed(2)}` : `${0}`} */}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
