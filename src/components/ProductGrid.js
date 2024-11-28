import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';
import './ProductGrid.css';

const ProductGrid = ({ myId }) => {
    const [collectionProducts, setCollectionProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const collectionId = myId || 138; // Allow dynamic or fallback to default collection ID

    useEffect(() => {
        const fetchCollectionProducts = async () => {
            try {
                const response = await axios.get(`https://vtex-backend.onrender.com/collectionProduct?collectionId=${collectionId}`);
                console.log('API Response:', response);

                if (Array.isArray(response.data.Data)) {
                    setCollectionProducts(response.data.Data);
                } else {
                    setError('Invalid response format');
                }
            } catch (err) {
                console.error('YEE Error fetching products:', err);
                setError('Failed to fetch collection products');
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionProducts();
    }, [collectionId]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Loading collection products...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="collection-product-container">
            <h1 className="product-heading">Collection Products</h1>
            <div className="product-grid">
                {collectionProducts.length > 0 ? (
                    collectionProducts.map((product) => (
                        <Link key={product.SkuId} to={`/product/${product.SkuId}`} className="product-card-link"> {/* Wrap card in Link */}
                            <div className="product-card">
                                <img
                                    src={product.SkuImageUrl || 'default-image.jpg'}
                                    alt={product.ProductName}
                                    className="product-image"
                                />
                                <h3 className="product-name">{product.ProductName}</h3>
                                <p className="product-price">
                                    {product.Price ? `$${(product.Price / 100).toFixed(2)}` : `$${0}`}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No products found in this collection.</p>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;











// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './ProductGrid.css';

// const ProductGrid = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/products');
//                 console.log('API Response:', response.data);
//                 setProducts(response.data);
//             } catch (err) {
//                 console.error('Error fetching products:', err);
//                 setError('Error fetching products');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div>
//             <div className="product-slider-container">
//                 <h1 className="product-heading">Occasion fashion</h1>
//             </div>
//             <div className="product-grid">
//                 {products.map(product => (
//                     <Link key={product.productId} to={`/product/${product.productId}`}>
//                         <div className="product-card">
//                             <img
//                                 src={product.items?.[0]?.images?.[0]?.imageUrl || 'default-image.jpg'}
//                                 alt={product.productName}
//                                 className="product-image"
//                             />
//                             <h3 className="product-name">{product.productName}</h3>
//                             <p className="product-price">
//                                 {product.items?.[0]?.sellers?.[0]?.commertialOffer?.Price
//                                     ? `$${(product.items[0].sellers[0].commertialOffer.Price / 100).toFixed(2)}`
//                                     : 'Price not available'}
//                             </p>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductGrid;
