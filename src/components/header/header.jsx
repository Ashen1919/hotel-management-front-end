import UserTag from "../userData/userTag.jsx";


function Header(){
    return(
        <header className="w-full bg-blue-700 flex h-[72px] relative items-center p-[10px] ">
            <h1 className="text-white text-[30px]">Leonine Villa</h1>
            <UserTag imageLink = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" name = "Joe Root"/>
            

        </header>
    )
}

export default Header;