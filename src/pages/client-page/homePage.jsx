import React, { useState, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import TopBar from "../../components/topBar/topBar.jsx";
import PreLoader from "../../components/preLoader/preLoader.jsx";
import UserTag from "../../components/userData/userTag.jsx";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for a token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If a token exists, set logged-in state to true

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <PreLoader />
        ) : (
          <div className="w-full h-screen flex flex-col items-center">
            <TopBar />
            <Header />
            {/* Conditionally render UserTag if logged in */}
            {isLoggedIn && (
              <UserTag imageLink="/path/to/default/image.jpg" />
            )}
          </div>
        )}
      </div>
    </>
  );
}
