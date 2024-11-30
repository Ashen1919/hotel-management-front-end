import React, { useState, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import TopBar from "../../components/topBar/topBar.jsx";
import PreLoader from "../../components/preLoader/preLoader.jsx";
import HomeContent from "./homeContent.jsx";
import BookingBar from "../../components/bookingBar.jsx";
import AboutUs from "../../components/aboutUs.jsx";
import HomeAbout from "./homeAbout.jsx";
import FeaturesList from "./featuresList.jsx";
import FeaturesHead from "../../components/features.jsx";
import RoomHead from "../../components/roomHead.jsx";
import Rooms from "./rooms.jsx";
import GalleryHead from "../../components/galleryHead.jsx";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    }, 2000); 
  })

  return (
    <>
      <div>
        {isLoading ? (
          <PreLoader />
        ) : (
          <div className="w-full h-screen flex flex-col items-center">
            <TopBar />
            <Header />
            <HomeContent/>
            <BookingBar/>
            <AboutUs/>
            <HomeAbout/>
            <FeaturesHead/>
            <FeaturesList/>
            <RoomHead/>
            <Rooms/>
            <GalleryHead/>
          </div>
        )}
      </div>
    </>
  );
}
