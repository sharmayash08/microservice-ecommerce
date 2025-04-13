import { Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import from react-scroll

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-2 bg-white shadow-sm">
      <div className="flex items-center space-x-6">
        <Link to="/" className="font-bold hover:underline">Home</Link>
        <Link to="/products" className="text-gray-600 hover:text-black hover:underline">Product</Link>
        {/* Change Categories link to scroll to Products section */}
        <ScrollLink
          to="products-section"  // This will target the element with the id "products-section"
          smooth={true}
          offset={-35}  // Adjust this value if needed for the navbar height
          duration={500}
          className="text-gray-600 hover:text-black hover:underline cursor-pointer"
        >
          Categories
        </ScrollLink>
        <Link to="/sale" className="text-gray-600 hover:text-black hover:underline">SALE</Link>
      </div>
      
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold">EVERYDAY ELEGANCE</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-2 pr-8 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <Link to="/cart">
          <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
}