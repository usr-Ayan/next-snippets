// write and export a React component that displays a loading spinner
import React from "react";


function Loader() {
  return (
    //write a sexy looking loader component with sexy animations like apple mouse loader
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      <span className="ml-4 text-lg text-gray-700">Loading...</span>
    </div>
   

  );
}
export default Loader;  