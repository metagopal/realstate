import {
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { db } from "../firebase";

function Home() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listing");
      const query1 = query(
        listingsRef,
        orderBy("timestamp", "desc"),
        limitToLast(5)
      );
      //console.log(q);
      const querySnap = await getDocs(query1);
      console.log(querySnap);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      console.log(listings);
    };

    fetchListings();
  }, []);

  return (
    <div className="App">
      <Slider />
    </div>
  );
}

export default Home;
