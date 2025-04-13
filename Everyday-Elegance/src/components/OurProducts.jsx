import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard'; // Import your ProductCard component
import Loader from './Loader';

const categories = ['Top', 'Bottom', 'Dress', 'Jewellery', 'Cosmetics' , 'Hair Flair'];

export default function OurProducts() {
  const [activeCategory, setActiveCategory] = useState('Top');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Strapi API URL for fetching products based on category and populating images
        const response = await fetch(
          `http://localhost:1337/api/products?filters[category][$eq]=${activeCategory}&populate=*`
        );
        const data = await response.json();

        // Map the response data to extract necessary fields
        const productsData = data.data.map(item => ({
          id: item.documentId,
          name: item.name,
          price: item.price,
          image: item.images[0]
            ? item.images[0].url
            : '/placeholder.svg', // Fallback in case image is missing
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const handleSeeMore = () => {
    navigate('/products'); // Navigate to the Products page route
  };

  return (
    <section id='products-section' className="container mx-auto px-12 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
      
      <div className="flex justify-center space-x-4 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category
                ? 'bg-gray-200 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {loading ? (
        <Loader className="align-middle" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-4 py-4 rounded-lg">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={`₹${product.price}`}
              image={product.image}
              onClick={() => navigate(`/productDetails/${product.id}`)} // Navigate to product details on click
            />
          ))}
        </div>
      )}
      
      <div className="text-center">
        <button className="inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800" onClick={handleSeeMore}>
          SEE MORE
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
