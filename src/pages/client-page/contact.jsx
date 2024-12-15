import React, { useState } from "react";

export default function Contact() {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="mt-8 bg-gray-100 w-full h-auto p-6">
      <div className="md:flex md:justify-between sm:justify-start">
        {/* Form Section */}
        <form action="" method="post" className="space-y-4 md:w-[47%]">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Your Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="occupation"
              className="block text-gray-700 font-medium"
            >
              Occupation:
            </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              placeholder="Occupation"
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="idea" className="block text-gray-700 font-medium">
              Your Idea:
            </label>
            <textarea
              name="idea"
              id="idea"
              placeholder="Share your feedback or ideas"
              className="w-full p-2 border border-gray-400 rounded-md h-20"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Rate Us:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 bg-amber-500 border-2 border-amber-500 hover:bg-transparent hover:border-2 hover:text-black transition duration-500 text-white font-medium py-2 px-6 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Vertical Line */}
        <div className="h-auto hidden md:block border-l-4 border-amber-300 ml-4 mr-4"></div>
        {/* Google Map Section */}
        <div className="mt-7 md:mt-0 md:w-[47%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.59631201997735!2d80.52247530163082!3d6.825541153942584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3976c78a9e325%3A0xe41511c61362fe49!2sThe%20Peak%20Residence%20hotel%20and%20restaurant!5e0!3m2!1sen!2slk!4v1734260076951!5m2!1sen!2slk"
            width="100%"
            height="450"
            className="border-0 rounded-md ml-2"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
