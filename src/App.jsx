import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/client-page/homePage.jsx";
import AdminPage from "./pages/adminPage/adminPage.jsx";
import LoginPage from "./pages/login/login.jsx";
import SignUpPage from "./pages/signUp/signUp.jsx";
import CategoriesPage from "./pages/client-page/categories.jsx";
import { Toaster } from "react-hot-toast";
import AllRooms from "./pages/client-page/bookingPage.jsx";



function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes path="/*">
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/AllRooms" element={<AllRooms/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
