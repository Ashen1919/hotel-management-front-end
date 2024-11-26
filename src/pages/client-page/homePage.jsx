import React, { useState, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import TopBar from "../../components/topBar/topBar.jsx";
import Preloader from "../../components/preLoader/preLoader.jsx"; 
import './homePage.css';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 3000); 
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <div className="w-full h-screen flex flex-col items-center">
        <TopBar />
        <Header />
      </div>
    </>
  );
}
