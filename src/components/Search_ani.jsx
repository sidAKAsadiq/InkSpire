import Input_field from "./Input_field/Input_field";
import React, { useState } from 'react';
import appwrite_service_obj from "../appwrite/config";
import { useDispatch } from "react-redux";
import { add_to_searched_docs, set_search_loader } from "../store/search_slice";

const Search_ani = React.forwardRef(function Search_ani({...props},ref) {
  const [search_value , set_search_value] = useState("")
  const dispatch = useDispatch()
  dispatch(add_to_searched_docs([]))

  const search = async(e) => {
    set_search_value("")
    e.preventDefault()
    console.log("In search ani");
    console.log("Searched : ", search_value)
    dispatch(set_search_loader(true))
    const searched_docs = await appwrite_service_obj.get_searched_posts(search_value)
    dispatch(add_to_searched_docs(searched_docs.documents))
    dispatch(set_search_loader(false))
  }



  return (
    <div className="relative inline-block"> 
      <div className="overflow-hidden z-0 rounded-full relative p-2"> {/* Reduced padding */}
        <form onSubmit={search} className="relative flex z-50 bg-white rounded-full">
          <Input_field 
           value = {search_value}
           type="text"
           placeholder="Search articles" 
           onChange = {(e) => (set_search_value(e.target.value))}
           className="rounded-xl flex-1 px-4 py-2 text-gray-700 focus:outline-none" /> 
          <button 
          type="submit" 
          className="bg-indigo-500 text-white rounded-full font-semibold px-6 py-2 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">
            Search
          </button>
        </form>
        <div className="glow glow-1 z-10 bg-pink-400 absolute"></div>
        <div className="glow glow-2 z-20 bg-purple-400 absolute"></div>
        <div className="glow glow-3 z-30 bg-yellow-400 absolute"></div>
        <div className="glow glow-4 z-40 bg-blue-400 absolute"></div>
      </div>
    </div>
  );
})

export default Search_ani;