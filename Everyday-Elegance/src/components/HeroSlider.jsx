import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/hero-sliders?populate=*") // Adjust URL as per your setup
      .then(response => response.json())
      .then(data => setSlides(data.data))
      .catch(error => console.error("Error fetching slides:", error));
  }, []);

  return (
    <div className="relative w-full py-6 flex justify-center items-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={slides.length > 1} // Enable loop only if more than 1 slide
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={`http://localhost:1337${slide.image.url}`}
              alt={slide.title || `Slide ${index}`}
              className="w-[93.5%] max-h-[450px] object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
