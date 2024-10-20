import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/client-page/homePage.jsx"
import AdminPage from "./pages/adminPage/adminPage.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes path = "/*">
        <Route path = "/" element = {<HomePage/>}></Route>
        <Route path = "/admin/*" element = {<AdminPage/>}/>
        <Route path="/*" element = {
          <div className="bg-white w-full h-[600vh]">
            <h1 className="text-red-500 text-[30px] text-center">404 Not Found!</h1>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
