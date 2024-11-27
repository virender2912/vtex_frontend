
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css';
import CollectionProduct from './CollectionProduct'; // Import the CollectionProductGrid component

const Banner = ({ imageSrc, title, description }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/collectionProduct');
                console.log('API Response:', response.data); // Log the response to check its structure
                setProducts(response.data.products || []); // Adjust if `products` is the correct key
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="banner-container">
            <div className="banner-image">
                <img
                    src={imageSrc}
                    alt="Banner"
                    className="banner-image-tag"
                />
            </div>
            <div className="banner-content">
                <h2 className="banner-title">{title}</h2>
                <p className="banner-description">{description}</p>

                {/* Insert the CollectionProductGrid component here */}
                <CollectionProduct />
            </div>
        </div>
    );
};

export default Banner;
































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Banner.css';
// import CollectionProduct from './CollectionProduct'; // Import the CollectionProductGrid component

// const Banner = ({ imageSrc }) => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('/collectionProduct');
//                 console.log('API Response:', response.data); // Log the response to check its structure
//                 setProducts(response.data.products || []); // Adjust if `products` is the correct key
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <div className="banner-container">
//             <div className="banner-image">
//                 <img
//                     src={imageSrc}
//                     alt="Banner"
//                     className="banner-image-tag"
//                 />
//             </div>
//             <div className="banner-content">
//                 <h2 className="banner-title">
//                     Distinctive designs of furs and bishts
//                 </h2>
//                 <p className="banner-description">
//                     Explore the luxury of traditional touches with a distinctive modern style
//                 </p>

//                 {/* Insert the CollectionProductGrid component here */}
//                 <CollectionProduct />
//             </div>
//         </div>
//     );
// };

// export default Banner;
