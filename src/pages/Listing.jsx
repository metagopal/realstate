import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";

import localImg from "../assets/key.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";

function Listing() {
  const params = useParams();

  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);

  const { imgUrls } = listing;

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  console.log(listing);
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {imgUrls?.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className="relative w-full overflow-hidden h-[300px]"
                style={{
                  background: `url(${listing.imgUrls[index]}) center no-repeat`,
                  backgroundSize:"cover"
                }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
}

export default Listing;
