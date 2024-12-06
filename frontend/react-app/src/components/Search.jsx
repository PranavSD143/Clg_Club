import React,{useState} from "react";
import "../css/search-field.css";

export default function Search(){

  const [initial_search,new_search] = useState("");
  function handleSelect(event)
  {
    new_search(event.target.value);
  }

  return <input type = "text" placeholder="Search" className="search-field" onChange={handleSelect}/>;

}