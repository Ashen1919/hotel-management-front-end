import UserTag from "../userData/userTag.jsx";
import "./header.css";

function Header(){
    return(
        <header>
            <h1 className="text-red-500">Hotel Management System</h1>
            <UserTag imageLink = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" name = "Joe Root"/>
            

        </header>
    )
}

export default Header;