import { ArrowLeft, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Cart() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  // State for shipping information
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4;
  const total = subtotal + shipping;

  // Check if all required fields are filled and if cart has items
  const isFormValid = name && address && city && state && zip && country;
  const isCartEmpty = cartItems.length === 0;

  // Handle checkout
  const handleCheckout = () => {
    if (!isFormValid) {
      alert("Please fill out all required fields.");
      return;
    }

    const orderDetails = {
      cartItems,
      subtotal,
      shipping,
      total,
      shippingAddress: { name, address, city, state, zip, country },
    };
    
    console.log("Order Details:", orderDetails);
    
    // Navigate to Thank You page
    clearCart();
    navigate("/thank-you");
  };

  return (
    <div className="container mx-auto p-12">
      <div className="mb-6 flex items-center gap-2">
        <ArrowLeft className="h-6 w-6 cursor-pointer" onClick={() => navigate("/")} />
        <h1 className="text-2xl font-bold">Shopping Continue</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Shopping cart</h2>
          <p className="mb-4 text-gray-600">You have {cartItems.length} item(s) in your cart</p>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:1337/${item.image}`}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.id, true)}
                      className="rounded p-1 hover:bg-gray-100"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <span className="text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, false)}
                      className="rounded p-1 hover:bg-gray-100"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="w-20 text-right">
                    <div className="font-semibold">₹{item.price}</div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded p-2 text-gray-600 hover:bg-gray-100"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-zinc-900 p-6 text-white">
          <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="mt-1 w-full rounded-md border-gray-300 bg-zinc-600 bg-opacity-50 p-2 placeholder-white"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium">Street Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter your street address"
                className="mt-1 w-full rounded-md border-gray-300 bg-zinc-600 bg-opacity-50 p-2 placeholder-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium">City</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  required
                  className="mt-1 w-full rounded-md border-gray-300 bg-zinc-600 bg-opacity-50 p-2 placeholder-white"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium">State</label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 bg-zinc-700 p-2"
                >
                  <option value="">Select state</option>
                  <option value="pb">Punjab</option>
                  <option value="mp">Madhya Pradesh</option>
                  <option value="ndls">New Delhi</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="zip" className="block text-sm font-medium">ZIP Code</label>
                <input
                  id="zip"
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                  placeholder="ZIP Code"
                  className="mt-1 w-full rounded-md border-gray-300 bg-zinc-600 bg-opacity-50 p-2 placeholder-white"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium">Country</label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 bg-zinc-700 p-2"
                >
                  <option value="">Select country</option>
                  <option value="in">India</option>
                </select>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total (Tax incl.)</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className={`mt-6 w-full rounded-md p-2 text-gray-900 ${isFormValid && !isCartEmpty ? 'bg-white hover:bg-gray-300' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isFormValid || isCartEmpty}
            >
              <span className="mr-2">₹{total}</span>
              <span>Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
