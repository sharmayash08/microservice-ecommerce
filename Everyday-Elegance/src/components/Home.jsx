import BestSeller from "./BestSeller"
import FeaturedCollections from "./FeaturedCollections"
import HeroSlider from "./HeroSlider"
import OurProducts from "./OurProducts"
import Testimonials from "./Testimonials"

const Home = () => {
  return (
    <>
        <HeroSlider />
        <BestSeller />
        <OurProducts />
        <FeaturedCollections />
        <Testimonials />
    </>
  )
}

export default Home