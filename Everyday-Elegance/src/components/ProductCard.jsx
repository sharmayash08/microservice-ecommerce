export default function ProductCard({ name, price, image, onClick }) {
  return (
    <div className="flex-none w-64 cursor-pointer" onClick={onClick}>
      <img 
        src={`http://localhost:1337${image}`}
        alt={name}
        className="w-full h-80 object-cover mb-2 rounded-sm"
      />
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-600">{price}</p>
    </div>
  );
}