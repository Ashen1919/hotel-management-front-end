import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function FeedBack() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackIsLoading, setFeedbackIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!feedbackIsLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/feedback/")
        .then((res) => {
          setFeedbacks(res.data.feedbacks);
          setFeedbackIsLoading(true);
        })
        .catch((err) => console.error("Failed to fetch feedback:", err));
    }
  }, [feedbackIsLoading]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <AiFillStar key={i} className="text-amber-500" />
        ) : (
          <AiOutlineStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-full max-w-md">
        {feedbacks.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {feedbacks[currentIndex].name}
            </h2>
            <h4 className="text-gray-500 text-sm mb-3">
              {feedbacks[currentIndex].occupation}
            </h4>
            <div className="flex justify-center mb-4">
              {renderStars(feedbacks[currentIndex].rating)}
            </div>
            <p className="text-gray-600 italic">
              "{feedbacks[currentIndex].comment}"
            </p>
          </div>
        )}
      </div>

      <div className="flex space-x-3 mt-5">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border-2 border-gray-500 hover:border-amber-500 hover:shadow-md transition duration-300"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full border-2 border-gray-500 hover:border-amber-500 hover:shadow-md transition duration-300"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
