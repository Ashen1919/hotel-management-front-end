import Header from "../../components/header/header.jsx";
import TopBar from "../../components/topBar/topBar.jsx";
import './homePage.css';

export default function HomePage() {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center">
        <TopBar/>
      <Header />
        
      </div>
    </>
  );
}
