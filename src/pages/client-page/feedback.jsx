import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function FeedBack(){
    return(
        <div className="flex md:mt-8">
            <div className="space-x-3 md:ml-[600px] lg:ml-[1100px]">
                <button className="pb-2 pt-2 pr-4 pl-4 rounded-r-full rounded-l-full border-2 border-gray-500 hover:border-2 hover:border-amber-500 hover:transition duration-300 transition"><FaArrowRight/></button>
                <button className="pb-2 pt-2 pr-4 pl-4 rounded-r-full rounded-l-full border-2 border-gray-500 hover:border-2 hover:border-amber-500 hover:transition duration-300 transition"><FaArrowLeft/></button>
            </div>
            <div className="flex mt-5">

            </div>
        </div>
    )
}