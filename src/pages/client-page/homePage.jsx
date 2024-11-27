import React, { useState, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import TopBar from "../../components/topBar/topBar.jsx";
import PreLoader from "../../components/preLoader/preLoader.jsx";

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
          </div>
        )}
      </div>
    </>
  );
}
