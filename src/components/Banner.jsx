import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css';
import CollectionProduct from './CollectionProduct';
import CollectionPage from './CollectionPage';
import SearchComponent from './SearchComponent';

const Banner = ({ imageSrc, heading, subheading, collectionID }) => { // Ensure the correct prop name
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://vtex-backend-1-hyln.onrender.com/collectionProduct');
                console.log('API Response:', response.data); // Log the structure for debugging
                setProducts(response.data.products || []); // Adjust key based on API response
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
                <h2 className="banner-title">{heading}</h2>
                <p className="banner-description">{subheading}</p>

                {/* Pass the productid prop to CollectionProduct */}
                <CollectionProduct id={collectionID} />
               
 
            </div>

            {/* <button type="button" title="View Collection" class="cta product-collection-banner__link-container product-collection-banner__link-container--sale">
            <span class="description-small-bold product-collection-banner__link-title description-small-bold product-collection-banner__link-title--sale">
            {buttonname}
                </span>
                <span class="product-collection-banner__link-subtitle product-collection-banner__link-subtitle--sale product-collection-banner__link-subtitle">
                {piececount}
                    </span>
                    <span class="icon icon--flip icon--fill product-collection-banner__link-icon product-collection-banner__link-icon--sale">
            </span></button> */}


        </div>
    );
};

export default Banner;
