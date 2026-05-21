import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
// Replace this with your actual local path to your farm image asset
import farmHeroImage from '../assets/farm.jpg'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// 2. Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then((response) => {
        setProducts(response.data);
        console.log("Fetched products:", response.data); // Debug log to check the fetched data
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      {/* HERO SECTION CONTAINER */}
      <div className="container-fluid p-0 hero-container overflow-hidden">
        <div className="row g-0 h-100 min-vh-100">
          
          {/* LEFT COLUMN - LIGHT BACKGROUND CONTENT */}
          <div className="col-12 col-md-5 bg-white d-flex flex-column justify-content-between px-4 px-lg-5 position-relative">
             <div className="hero-image-wrapper mt-4 mt-md-0">
              <img 
                src={farmHeroImage} 
                alt="Fresh farm products basket handling" 
                className="img-fluid hero-farm-img shadow"
              />
            </div>
            <div className="pt-4 pt-lg-5 max-content-width">
              <h2 className="farm-title-dark mb-3">
                Pure Farm Freshness, Delivered Daily
              </h2>
              <h5 className="farm-subtitle-dark mb-4">
                Healthy living starts from natural farming
              </h5>
              <p className="farm-text-muted">
                We provide fresh cow milk, country eggs, coconuts, organic manure, 
                and naturally raised farm products directly from our village farms to your home.
              </p>
            </div>

            {/* Overlapping Absolute Image Wrapper Box */}
           
          </div>

          {/* RIGHT COLUMN - DARK GREEN BACKGROUND CONTENT */}
          <div className="col-12 col-md-7 farm-bg-dark d-flex flex-column justify-content-between p-4 p-lg-5 text-white">
            {/* Header navbar loaded inside the right side layout block */}
           

            <div className="my-auto py-5 pe-lg-5 max-content-width align-self-center w-100">
              <h1 className="farm-display-title mb-4">
                FRESH FROM <br /> OUR FARM
              </h1>
              
              <p className="farm-text-light mb-4">
                Experience the taste of pure and natural farming with our fresh dairy products, 
                organic fertilizers, and healthy poultry raised with care.
              </p>
              
              <p className="farm-text-highlight mb-4">
                Natural products grown with traditional farming methods
              </p>
              
              <p className="farm-text-light">
                Our farm supplies fresh cow milk, farm eggs, coconuts, maatu uram, goat uram, 
                and healthy chickens with quality and trust you can rely on every day.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* DYNAMIC PRODUCTS SECTION BELOW */}
      <div className="container my-5 pt-5 text-center">
        <h3 className="mb-5 fw-bold text-dark text-center">Our Products</h3>
        
        <div className="product-slider-container px-md-4">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}          // Gap between slides (matches Bootstrap g-4 gap)
            slidesPerView={1}          // 1 slide on mobile
            loop={true}                // Infinite loop
            centeredSlides={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}          // Left and Right arrows
            breakpoints={{
              // When window width is >= 576px (Bootstrap sm)
              576: {
                slidesPerView: 2,
              },
              // When window width is >= 992px (Bootstrap lg)
              992: {
                slidesPerView: 3,      // Shows exactly 3 slides on desktop
              }
            }}
            className="pb-5"            // Extra padding at bottom for pagination bullets
          >
            {products.map((item) => (
              <SwiperSlide key={item.id} className="d-flex justify-content-center h-auto">
                {/* We wrap the card inside a div to make sure it plays nice with Swiper's heights */}
                <div className="w-100 h-100 px-1">
                  <ProductCard item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    
    </>
  );
}

export default Home;