import { useState } from "react";

function TestComponent(){
    const [num, setNum] = useState(0)
    return(
        <div className="bg-blue-600 w-full h-[100vh] flex justify-center items-center">
            <div className="bg-white w-[350px] h-[350px] rounded-md flex justify-center items-center">
                <button className="p-4 bg-gray-300 rounded-full w-[60px] h-[60px] items-center justify-center text-2xl hover:bg-gray-400" onClick={
                    ()=>{
                        const newNum = num - 1
                        setNum(newNum)
                    }}> - </button>
                <span className="text-5xl mr-5 ml-5">{num}</span>
                <button className="p-4 bg-gray-300 rounded-full w-[60px] h-[60px] items-center justify-center text-2xl hover:bg-gray-400" onClick={
                    ()=>{
                        const newNum = num + 1
                        setNum(newNum)
                    }
                }> + </button>

            </div>
        </div>
    )
}

export default TestComponent;