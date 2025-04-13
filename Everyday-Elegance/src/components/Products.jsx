import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import Loader from './Loader'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const navigate = useNavigate();

  // Fetch all products from the Strapi API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:1337/api/products?populate=*`);
        const data = await response.json();

        // Map data to the necessary format
        const productsData = data.data.map(item => ({
          id: item.documentId,
          name: item.name,
          price: item.price,
          category: item.category,
          image: item.images[0]
            ? item.images[0].url
            : '/placeholder.svg',
        }));

        setProducts(productsData);
        setFilteredProducts(productsData); // Initialize with all products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on user input
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, priceRange, products]);

  // Redirect to product details page
  const handleProductClick = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  return (
    <section className="container mx-auto px-12 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Products</h2>

      <div className="flex justify-between items-center mb-6">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full max-w-xs mr-4"
        />

        {/* Category filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Top">Top</option>
          <option value="Bottom">Bottom</option>
          <option value="Dress">Dress</option>
          <option value="Jewellery">Jewellery</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Hair Flair">Hair Flair</option>
        </select>

        {/* Price range filter */}
        <div className="flex items-center space-x-2 ml-4">
          <label>Price:</label>
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="border p-2 rounded w-20"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="border p-2 rounded w-20"
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
