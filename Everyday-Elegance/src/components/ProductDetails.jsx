import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Use useNavigate for navigation
import { Heart, Minus, Plus, Truck, Eye } from 'lucide-react';
import { useCart } from './CartContext';
import Loader from './Loader';
import Toaster from './Toaster';

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showToaster, setShowToaster] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);  // Track if item is added
  const navigate = useNavigate();  // Use navigate from react-router-dom

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(`http://localhost:1337/api/products/${productId}?populate=*`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    }
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <Loader />;
  }

  const productImages = product.data.images || [];
  const selectedImageUrl = productImages[selectedImage]?.url;

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: product.data.name,
      price: product.data.price,
      quantity,
      size: selectedSize,
      image: selectedImageUrl,
    });

    // Show the toaster notification
    setShowToaster(true);

    // Set the state to indicate that the product has been added
    setAddedToCart(true);
  };

  const handleGoToCart = () => {
    // Navigate to the cart page using useNavigate
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show Toaster if item is added to cart */}
      {showToaster && (
        <Toaster message="Item added to cart successfully!" onClose={() => setShowToaster(false)} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <span>Home</span>
          <span>/</span>
          <span>{product.data.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.data.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            {/* Product Images */}
            <div className="flex flex-col gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border rounded-lg overflow-hidden ${selectedImage === index ? 'border-red-500' : 'border-gray-200'}`}
                >
                  <img
                    src={`http://localhost:1337/${img.url}`}
                    alt={`${product.data.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="flex-1">
              {selectedImageUrl ? (
                <img
                  src={`http://localhost:1337/${selectedImageUrl}`}
                  alt={product.name}
                  className="w-3/4 h-auto rounded-lg mx-4"
                />
              ) : (
                <div>No image available</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-semibold">{product.data.name}</h1>

            <div className="text-3xl font-bold">₹{product.data.price}</div>
            <p className="text-gray-600">{product.data.description}</p>

            {/* Sizes */}
            <div className="space-y-4">
              <div className="font-semibold">Size:</div>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${selectedSize === size ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-6">
              <div className="flex items-center border rounded-md">
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="p-2 hover:bg-gray-100">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={addedToCart ? handleGoToCart : handleAddToCart}
                className={`px-8 py-3 ${addedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-md`}
              >
                {addedToCart ? 'Go to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
