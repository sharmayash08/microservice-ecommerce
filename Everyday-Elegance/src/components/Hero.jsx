import model1 from "../assets/model1.png"
import model2 from "../assets/model2.png"
import model3 from "../assets/model3.png"
import model4 from "../assets/model4.png"

export default function Hero() {
  return (
    <section className="relative h-[468px] bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 flex justify-around items-end">
        <img src={model2} alt="Model in striped sweater and skirt" className="h-5/6 object-cover" />
        <img src={model1} alt="Model in denim outfit" className="h-5/6 object-cover" />
        <img src={model3} alt="Model in striped cardigan and white skirt" className="h-5/6 object-cover" />
        <img src={model4} alt="Model in white shirt and jeans" className="h-5/6 object-cover" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-bold mb-2">MEJIWOO</h1>
        <p className="text-xl mb-4">미지우</p>
        <div className="w-16 h-0.5 bg-black mb-4"></div>
        <p className="text-lg max-w-md">
          make your everyday look prettier with MEJIWOO Korean Made
        </p>
      </div>
    </section>
  );
}