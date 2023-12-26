import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "../../context/BlogContextProvider";
import BlogCard from "../blogs/blogCard/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";

// import { Navigation, Mousewheel, Keyboard } from "swiper/modules";

function Slider({ categoryId }) {
  const [sliderData, setSliderData] = useState([]);
  const { blogsList } = useBlogs();
  const params = useParams();

  const sliderRef = useRef(null);

  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  };

  useEffect(() => {
    const filterData = blogsList?.find((blog) => blog.id === Number(params.id));

    if (filterData) {
      const filteredBlogs = blogsList?.filter((blog) => {
        return categoryId?.some((categoryIdItem) => {
          return blog.categories?.some(
            (blogCategory) => blogCategory.id === categoryIdItem.id
          );
        });
      });
      const filteredSliderData = filteredBlogs?.filter(
        (blog) => blog.id !== filterData.id
      );

      setSliderData(filteredSliderData);
    }
  }, [blogsList, params.id, categoryId]);

  return (
    <div className="common_container">
      <div className="slider_header">
        <span>მსგავსი პოსტები</span>

        <div className="slider_navigation">
          <div className="prev-arrow" onClick={handlePrev} />
          <div className="next-arrow" onClick={handleNext} />
        </div>
      </div>
      <Swiper
        ref={sliderRef}
        slidesPerView={3}
        cssMode={true}
        // navigation={true}
        mousewheel={true}
        keyboard={true}
        // modules={[Navigation, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {sliderData?.map((blog, index) => (
          <SwiperSlide key={index}>
            <BlogCard blogCard={blog} slider />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
