import "./userTag.css"

function UserTag(props){
    const name = props.name;
    const imageLink = props.imageLink;
    return(
        <div className="user-data-div">
            <img src={props.imageLink} alt="user image" />
            <span>{props.name}</span>
        </div>
    )
}
export default UserTag;