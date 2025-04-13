import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-lg mb-6">We appreciate your purchase. Your order is being processed.</p>
      <button onClick={() => navigate("/")} className="mt-6 rounded-md bg-indigo-600 p-2 text-white hover:bg-indigo-700">
        Back to Home
      </button>
    </div>
  );
}

export default ThankYou;
