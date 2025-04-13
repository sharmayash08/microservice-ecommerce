import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

export default function BestSeller() {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false); // Set to false initially
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch best-selling products from the API
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/products?populate=*&filters[isBestseller][$eq]=true');
        const data = await response.json();
        
        const productsData = data.data.map((item) => ({
          id: item.documentId,
          name: item.name,
          price: item.price,
          image: item.images[0]?.url 
            ? item.images[0].url
            : '/placeholder.svg', // fallback image
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
      }
    };

    fetchBestSellers();
  }, []);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      
      // Check the dimensions once after products have loaded
      handleScroll();
    }

    return () => {
      if (ref) {
        ref.removeEventListener('scroll', handleScroll);
      }
    };
  }, [products]); // Trigger when products load

  return (
    <section className="container mx-auto px-12 py-8">
      <h2 className="text-3xl font-bold text-center mb-14">Our Best Seller</h2>
      <div className="relative">
        <div ref={scrollRef} className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={`₹${product.price}`}
              image={product.image}
              onClick={() => handleProductClick(product.id)} 
            />
          ))}
        </div>
        {showLeftButton && (
          <button
            onClick={() => scroll(-300)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {showRightButton && (
          <button
            onClick={() => scroll(300)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
}
