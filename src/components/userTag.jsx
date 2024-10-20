function UserTag(props){
    const name = props.name;
    const imageLink = props.imageLink;
    return(
        <div>
            <img src={props.imageLink} alt="user image" style={{width: 100}} />
            <h1>{props.name}</h1>
        </div>
    )
}
export default UserTag;