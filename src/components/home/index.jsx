import React from "react";
import "./index.css";
import NavBar from "../navbar";
import WeatherData from "../weatherData";

function Home() {
  return (
    <div className="homebg">
      <NavBar />
      <WeatherData />
    </div>
  );
}

export default Home;
