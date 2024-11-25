import UserTag from "../userData/userTag.jsx";
import './header.css';

function Header() {
    return (
        <header className="header flex items-center justify-between px-4 py-2 bg-gray-100">
            <a href="/" className="logo">
                <img src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6743ffa3001b83734dff/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin" alt="Logo" className="h-12 w-auto" />
            </a>

            <nav className="navbar flex space-x-4">
                <a href="/" >Home</a>
                <a href="/" >About</a>
                <a href="/" >Rooms</a>
                <a href="/" >Gallery</a>
                <a href="/" >Contact</a>
            </nav>
        </header>
    );
}

export default Header;
