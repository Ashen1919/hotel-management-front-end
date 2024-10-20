import UserTag from "./userTag.jsx";

function Header(){
    return(
        <header>
            <h1>Hotel Management System</h1>
            <UserTag imageLink = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" name = "Joe Root"/>
            <UserTag imageLink = "https://livewiredemos.com/images/avatar.png" name = "Ewa Mendes"/>

        </header>
    )
}

export default Header;