import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-2">EVERYDAY ELEGANCE</h2>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">News</a></li>
              <li><a href="#" className="hover:underline">Official Store</a></li>
              <li><a href="#" className="hover:underline">Company</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Get Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Payment</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><Link to="/contact-page" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-red-600 hover:text-red-800">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 EVERYDAY ELEGANCE. All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:underline">Guide</a>
            <a href="#" className="text-sm hover:underline">Terms & Conditions</a>
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}