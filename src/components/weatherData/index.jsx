import React from "react";
import { dotenv } from "dotenv";
import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { WiSnowWind } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";
import { CircleLoader } from "react-spinners";
function WeatherData() {
  const key = import.meta.env.VITE_APIKEY;

  const [userval, setUserVal] = useState("");
  const [locData, setLocData] = useState("gadwal");
  const [resData, setResData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState("");
  const featchdata = async () => {
    console.log(locData, "ll");
    setLoader(true);
    setErr("");
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${locData}&aqi=yes`
      );

      setLoader(false);
      console.log(res.data);
      setResData(res.data);
    } catch (error) {
      setLoader(false);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(
            "Response Error:",

            error.response.data.error.message
          );
          setErr(error.response.data.error.message);
        } else if (error.request) {
          console.log(
            "Request Error: No response received",
            error.request.err.message
          );
        } else {
          console.error("Axios Error:", error.message);
        }
      } else {
        console.error("Unknown Error:", error);
      }
    }
  };

  const inputData = (e) => {
    console.log(e.target.value);
    setUserVal(e.target.value);
  };

  const search = () => {
    setLocData(userval);
    console.log(userval);
    const featchdata = async () => {
      //console.log(userval, "lll");
      setLoader(true);
      setErr("");
      try {
        const res = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${key}&q=${userval}&aqi=yes`
        );

        setLoader(false);
        console.log(res.data);
        setResData(res.data);
      } catch (error) {
        setLoader(false);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(
              "Response Error:",

              error.response.data.error.message
            );
            setErr(error.response.data.error.message);
          } else if (error.request) {
            console.log(
              "Request Error: No response received",
              error.request.err.message
            );
          } else {
            console.error("Axios Error:", error.message);
          }
        } else {
          console.error("Unknown Error:", error);
        }
      }
    };
    featchdata();
  };

  useEffect(() => {
    featchdata();
  }, []);
  console.log(resData, "res");
  return (
    <div className="weatherdatabg">
      <div className="searchdiv">
        <input
          onChange={inputData}
          placeholder="enter place"
          value={userval}
          className="input"
        />
        <button onClick={search} className="btn searchbtn">
          Search
        </button>
      </div>
      {loader ? (
        <CircleLoader />
      ) : err != "" ? (
        <p>{err}</p>
      ) : resData == null ? (
        ""
      ) : (
        <div className="card">
          <div className="adressdiv">
            <p className="locationp">
              Location : <span className="span">{resData.location.name}</span> ,
              <span className="span">{resData.location.region} </span> ,
              <span className="span">{resData.location.country} </span>
            </p>
            <p className="locationp">
              Latitude : <span className="span">{resData.location.lat}</span>
            </p>
            <p className="locationp">
              Longitude : <span className="span">{resData.location.lon} </span>
            </p>
          </div>

          <div className="infodiv">
            <div className="d-flex flex-row justify-content-center">
              <div className="tempdiv">
                <div className="d-flex d-row">
                  <img
                    src={resData.current.condition.icon}
                    className="tempImg"
                  />
                  <p className="locationp">{resData.current.temp_c}&#8451;</p>
                </div>
                <p className="tempTitle">{resData.current.condition.text}</p>
              </div>
            </div>
            <div className="d-flex flex-row flex-wrap">
              <p className="locationp">Feels Like :</p>
              <p className="span">{resData.current.feelslike_c}&#8451;</p>
              <p className="locationp">Feels Like :</p>
              <p className="span">{resData.current.feelslike_f} &#8457;</p>
              <div className="d-flex flex-row pl-5">
                <p className="locationp">Humidity :</p>
                <WiSnowWind className="icon" />

                <p className="span">{resData.current.humidity} &#37;</p>
              </div>
              <div className="d-flex flex-row ">
                <p className="locationp">Wind Speed :</p>
                <GiWhirlwind className="icon" />

                <p className="span">{resData.current.wind_kph} kmph</p>
              </div>
              <div className="d-flex flex-row ">
                <p className="locationp">Wind Direction :</p>
                <GiWhirlwind className="icon" />

                <p className="span">{resData.current.wind_dir} </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherData;
// (
//   <div className="card">
//     <div className="adressdiv">
//       <p className="locationp">
//         Location : <span className="span">{resData.location.name}</span> ,
//         <span className="span">{resData.location.region} </span> ,
//         <span className="span">{resData.location.country} </span>
//       </p>
//       <p className="locationp">
//         Latitude : <span className="span">{resData.location.lat}</span>
//       </p>
//       <p className="locationp">
//         Longitude : <span className="span">{resData.location.lon} </span>
//       </p>
//     </div>

//     <div className="infodiv">
//       <div className="d-flex flex-row justify-content-center">
//         <div className="tempdiv">
//           <div className="d-flex ">
//             <img src={resData.current.condition.icon} />
//             <p className="locationp">{resData.current.temp_c}&#8451;</p>
//           </div>
//           <p>{resData.current.condition.text}</p>
//         </div>
//       </div>
//       <div className="d-flex flex-row flex-wrap">
//         <p className="locationp">Feels Like :</p>
//         <p className="span">{resData.current.feelslike_c}&#8451;</p>
//         <p className="locationp">Feels Like :</p>
//         <p className="span">{resData.current.feelslike_f} &#8457;</p>
//         <div className="d-flex flex-row pl-5">
//           <p className="locationp">Humidity :</p>
//           <WiSnowWind className="icon" />

//           <p className="span">{resData.current.humidity} &#37;</p>
//         </div>
//         <div className="d-flex flex-row ">
//           <p className="locationp">Wind Speed :</p>
//           <GiWhirlwind className="icon" />

//           <p className="span">{resData.current.wind_kph} kmph</p>
//         </div>
//         <div className="d-flex flex-row ">
//           <p className="locationp">Wind Direction :</p>
//           <GiWhirlwind className="icon" />

//           <p className="span">{resData.current.wind_dir} </p>
//         </div>
//       </div>
//     </div>
//   </div>
// )
