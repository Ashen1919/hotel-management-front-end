import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/client-page/homePage.jsx"
import AdminPage from "./pages/adminPage/adminPage.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes path = "/*">
        <Route path = "/*" element = {<HomePage/>}></Route>
        <Route path = "/admin/*" element = {<AdminPage/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
