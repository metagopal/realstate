import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
} from "firebase/firestore";

import Spinner from "../components/Spinner";
import { db } from "../firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { useNavigate } from "react-router-dom";

function Slider() {
  const navigate = useNavigate();

  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const listingsRef = collection(db, "listings");
      const query1 = query(
        listingsRef,
        orderBy("timestamp", "desc"),
        limitToLast(5)
      );

      const querySnap = await getDocs(query1);

      const listings = [];
      querySnap.forEach((doc) => {
        
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(listings);

      setLoading(false);
      console.log(listing);
    };

    fetchListings();
  }, []);

  if (loading) return <Spinner />;

  if (listing.length === 0) {
    return <>null</>;
  }
  return (
    <>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing?.map(({data, id}) => {
          return (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                className="relative w-full overflow-hidden h-[300px]"
                style={{
                  background: `url(${data?.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>

              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
                {data.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                ${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && "/ Month"}
              </p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Slider;
