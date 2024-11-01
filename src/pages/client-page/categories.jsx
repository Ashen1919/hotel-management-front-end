import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const[categoriesIsLoaded, setCategoriesIsLoaded] = useState(false)

  useEffect(()=>{
    if(!categoriesIsLoaded){
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/category/").then((res)=>{
        setCategories(res.data.categories)
        setCategoriesIsLoaded(true)
      })
    }
    
  }, [categoriesIsLoaded]); 

 
  function deleteItem(name){
    if(window.confirm("Are you sure? Do you want to delete "+name+ " category?")){
      axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name).then((res)=>{
        setCategoriesIsLoaded(false)
        
      })
      
    }
  }
  

  return (
    <div className="p-4 w-full">
      <table className="w-full bg-white border border-gray-400 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Price($)</th>
            <th className="p-2 border border-gray-300">Image</th>
            <th className="p-2 border border-gray-300">Features</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.name} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300">{category.name}</td>
              <td className="p-2 border border-gray-300">
                {category.description}
              </td>
              <td className="p-2 border border-gray-300">{category.price}</td>
              <td className="p-2 border border-gray-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-2 border border-gray-300">
                {category.features.join(", ")}
              </td>
              <td className="p-2 border border-gray-300">
                <button className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-20 " onClick={()=>
                  deleteItem(category.name)
                }>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
