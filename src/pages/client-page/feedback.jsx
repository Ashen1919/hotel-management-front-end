import axios from "axios";
import React, { useEffect, useState } from "react";
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
          const approvedFeedbacks = res.data.feedbacks.filter(
            (feedback) => feedback.approved === true
          );
          setFeedbacks(approvedFeedbacks);
          setFeedbackIsLoading(true);
        })
        .catch((err) => console.error("Failed to fetch feedback:", err));
    }
  }, [feedbackIsLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 3 >= feedbacks.length ? 0 : prevIndex + 1
      );
    }, 7000); 
    return () => clearInterval(interval); 
  }, [feedbacks]);

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

  const visibleFeedbacks = feedbacks.slice(currentIndex, currentIndex + 3);
  const visibleFeedbacksOnMobile = feedbacks.slice(currentIndex);

  return (
    <div className="flex flex-col items-center mt-8 w-full h-auto bg-gray-100">
      {feedbacks.length > 0 ? (
        <div className="flex sm:hidden md:block justify-center gap-4">
          {visibleFeedbacks.map((feedback, index) => (
            <div
              key={feedback.feedbackId}
              className="bg-white shadow-lg rounded-lg p-6 w-80 text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {feedback.name}
              </h2>
              <h4 className="text-gray-500 text-sm mb-3">
                {feedback.occupation}
              </h4>
              <div className="flex justify-center mb-4">
                {renderStars(feedback.rating)}
              </div>
              <p className="text-gray-600 italic">"{feedback.comment}"</p>
            </div>
          ))}
          <div className="flex sm:block md:hidden justify-center gap-4">
          {visibleFeedbacksOnMobile.map((feedback, index) => (
            <div
              key={feedback.feedbackId}
              className="bg-white shadow-lg rounded-lg p-6 w-80 text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {feedback.name}
              </h2>
              <h4 className="text-gray-500 text-sm mb-3">
                {feedback.occupation}
              </h4>
              <div className="flex justify-center mb-4">
                {renderStars(feedback.rating)}
              </div>
              <p className="text-gray-600 italic">"{feedback.comment}"</p>
            </div>
          ))}
        </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">No approved feedbacks available.</p>
      )}
    </div>
  );
}
