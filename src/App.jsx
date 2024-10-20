import Header from "./components/header/header.jsx"

function App() {

  return (
    <>
      <Header/>
      <div className="w-full h-screen bg-blue-900 flex flex-col items-center ">
        <div className="border border-white bg-white w-[700px] h-[90px] rounded-lg flex justify-center items-center mt-[30px]">
          <input type="date" name="" id="" />
          <input type="date" name="" id="" />
          <select name="" id="" className="">
            <option value="" selected>Select a category</option>
            <option value="">Standard</option>
            <option value="">Dulux</option>
            <option value="">Luxury</option>
          </select>
          <button type="button">Book Now</button>
        </div>
        <h1 className="text-white text-[50px]">Welcome To The Leonine Villa</h1>
      </div>
    </>
  )
}

export default App
