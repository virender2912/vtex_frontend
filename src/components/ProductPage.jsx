import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams(); // Get the product ID from the URL

    // Fetch product details based on the ID or use static data for now
    const product = products.find(p => p.id === id);

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
        </div>
    );
};

export default ProductPage;