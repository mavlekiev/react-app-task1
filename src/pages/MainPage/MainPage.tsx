import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import "./MainPage.css";

const MainPage = () => {
  const handleClick = () => {
    
  }
  return (
    <div className="main-container">
      <h1 className="text-3xl font-bold">Forms</h1>
      <div className="main-container__buttons ">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleClick}>
          Click to open the form
        </button>
        <button className="button" onClick={handleClick}>
          Click to open the form
        </button>
      </div>
    </div>
  );
};

export default MainPage;
