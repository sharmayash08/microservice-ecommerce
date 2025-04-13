import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import testimonial1 from '../assets/testimonial1.png';
import testimonial2 from '../assets/testimonial2.png';
import testimonial3 from '../assets/testimonial3.png';

const testimonials = [
  {
    id: 1,
    productName: 'Essence Long Denim',
    image: testimonial1,
    rating: 5,
    customerName: 'Lisa',
    review: "I like this pants. Its fit and perfect for me. The material is so comfortable that it can be used anywhere. It is also suitable to be combined with all types of my clothes."
  },
  {
    id: 2,
    productName: 'Andcable Knit Top',
    image: testimonial2,
    rating: 5,
    customerName: 'Celine',
    review: "I like knitted materials. I bought this shirt because the design is very pretty and comfortable to wear casually. The material is also neat and good. I love shopping here and I'll be a frequent customer at this store."
  },
  {
    id: 3,
    productName: 'Candy Stripe Boxy',
    image: testimonial3,
    rating: 5,
    customerName: 'Tiffany',
    review: "This shirt is very pretty and nice. The color is cute too. At first I bought it as a present for my friend but I also wanted it so we ended up going out wearing twin clothes haha."
  },
  {
    id: 4,
    productName: 'Essence Long Denim',
    image: testimonial2,
    rating: 5,
    customerName: 'Lisa',
    review: "I like this pants. Its fit and perfect for me. The material is so comfortable that it can be used anywhere. It is also suitable to be combined with all types of my clothes."
  },
  {
    id: 5,
    productName: 'Andcable Knit Top',
    image: testimonial1,
    rating: 5,
    customerName: 'Celine',
    review: "I like knitted materials. I bought this shirt because the design is very pretty and comfortable to wear casually. The material is also neat and good. I love shopping here and I'll be a frequent customer at this store."
  },
  {
    id: 6,
    productName: 'Candy Stripe Boxy',
    image: testimonial3,
    rating: 5,
    customerName: 'Tiffany',
    review: "This shirt is very pretty and nice. The color is cute too. At first I bought it as a present for my friend but I also wanted it so we ended up going out wearing twin clothes haha."
  },
  // Add more testimonials as needed
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    };

    scrollRef.current.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="container mx-auto px-12 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">What They Said</h2>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth"
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-none w-80 bg-orange-50 p-4 rounded-lg shadow">
              <img
                src={testimonial.image}
                alt={testimonial.productName}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <h3 className="font-semibold text-lg mb-2">{testimonial.productName}</h3>
              <StarRating rating={testimonial.rating} />
              <p className="text-sm text-gray-600 mt-2">-{testimonial.customerName}-</p>
              <p className="text-sm mt-2">{testimonial.review}</p>
            </div>
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