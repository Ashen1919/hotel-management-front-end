import Header from "../../components/header/header.jsx";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full h-screen bg-blue-900 flex flex-col items-center">
        <div className="border border-white bg-white w-[700px] h-[90px] rounded-lg flex justify-center items-center mt-[30px] space-x-4 p-4">
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="p-2 border rounded"
          />
          <select name="category" id="category" className="p-2 border rounded">
            <option value="" selected>
              Select a category
            </option>
            <option value="Standard">Standard</option>
            <option value="Dulux">Dulux</option>
            <option value="Luxury">Luxury</option>
          </select>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Book Now
          </button>
        </div>
        <h1 className="text-white text-[50px] mt-8">
          Welcome To The Leonine Villa
        </h1>
      </div>
    </>
  );
}
