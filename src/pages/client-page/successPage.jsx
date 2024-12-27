import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="mt-5 w-full h-[100vh] flex flex-col md:flex-row ml-5 md:ml-10 mr-10 ">
      <div className="md:w-[50%] w-full h-auto">
        <img
          src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/676e279200020630fd9f/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
          alt="success artboard"
        />
      </div>
      <div className="md:w-[50%] w-full h-auto flex flex-col">
        <img
          src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/676e27860012aca09898/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
          alt=""
          className="justify-center md:ml-52 hidden items-center md:flex w-40 h-40"
        />
        <h1 className="md:text-6xl text-[40px] text-green-600 md:text-black font-bold justify-center items-center flex">
          Congratulations! 🎉
        </h1>
        <h1 className="mt-5 justify-center items-center flex md:text-4xl mr-5 text-3xl font-semibold">
          You have successfully reserved a room.
        </h1>
        <div className="md:mt-10 mt-5">
          <Link to={"/"}>
            <button className="p-5 bg-red-500 rounded-xl text-white text-xl font-bold flex flex-row items-center gap-3 border-4 border-red-500 hover:border-4 hover:bg-transparent hover:text-black transition-all duration-500 mb-10">
              <IoArrowBack className="text-2xl" />
              Back To Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
