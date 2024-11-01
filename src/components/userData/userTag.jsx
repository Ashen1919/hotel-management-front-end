import axios from "axios";
import { useEffect, useState } from "react";

function UserTag(props){
    const[name, setName] = useState("")
    const token = localStorage.getItem("token")

    useEffect(()=>{
        if(token != null){
            console.log(token)
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/", {
                headers: {
                    Authorization: "Bearer "+ token,
                    "Content-Type": "application/json",
                },
            }).then((res)=>{
                console.log(res)
                setName(res.data.user.firstName+ " "+ res.data.user.lastName);
            })
        }
    }, []);

    return(
        <div className="absolute right-0 flex items-center cursor-pointer">
            <img className="rounded-full w-[75px] h-[69px] " src={props.imageLink} alt="user image" />
            <span className="text-white ml-[7px] text-xl mr-[7px]">{name}</span>
        </div>
    )
}
export default UserTag;