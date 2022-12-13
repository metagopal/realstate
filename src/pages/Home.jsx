import {
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

import Slider from "../components/Slider";
import { db } from "../firebase";

function Home() {
  //Offers
  const [offerListings, setOfferListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get refrence
        const listingsRef = collection(db, "listings");
        //create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limitToLast(4)
        );
        // execute the query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  //Places for Rent
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get refrence
        const listingsRef = collection(db, "listings");
        //create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limitToLast(4)
        );
        // execute the query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  //Places for Rent
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get refrence
        const listingsRef = collection(db, "listings");
        //create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limitToLast(4)
        );
        // execute the query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <Slider />

      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="text-2xl mt-6 font-semibold">Recent offers</h2>
            <Link to="/offers">
              <p className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {offerListings?.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                );
              })}
            </ul>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="text-2xl mt-6 font-semibold">
              Places for rent
            </h2>
            <Link to="/category/rent">
              <p className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rentListings?.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                );
              })}
            </ul>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="text-2xl mt-6 font-semibold">
              Places for sale
            </h2>
            <Link to="/category/sale">
              <p className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {saleListings?.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
