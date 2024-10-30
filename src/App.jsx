import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/client-page/homePage.jsx"
import AdminPage from "./pages/adminPage/adminPage.jsx"
import TestComponent from "./components/test/test.jsx"
import LoginPage from "./pages/login/login.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes path = "/*">
        <Route path = "/*" element = {<HomePage/>}></Route>
        <Route path = "/admin/*" element = {<AdminPage/>}/>
        <Route path="/login" element = {<LoginPage/>} />
        <Route path="/test" element = {<TestComponent/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
