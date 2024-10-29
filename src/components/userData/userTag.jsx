

function UserTag(props){
    const token = localStorage.getItem("token")

    if(token != null){
        console.log(token)
    }

    return(
        <div className="absolute right-0 flex items-center cursor-pointer">
            <img className="rounded-full w-[75px] h-[69px] " src={props.imageLink} alt="user image" />
            <span className="text-white ml-[7px] text-xl mr-[7px]">{props.name}</span>
        </div>
    )
}
export default UserTag;