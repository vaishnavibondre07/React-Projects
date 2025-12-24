import React from "react";

function Card( { lang , btn="click me" } ) {
  
  return (
    
    <div className="h-[80px] w-[200px] border-2 m-5 p-5 rounded-lg shadow-lg">
    <h1>Language: {lang}</h1>
    <button>{btn}</button>
    </div>
   
  )
}


export default Card
