import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

  const inputRef=useRef();
  const[weatherData,setWeatherData]=useState(false);

  const search=async(city)=>{
    if(city===""){
      alert("Enter City Name")
      return;
    }
    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response=await fetch(url);
      const data=await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      console.log(data.weather[0].icon)
      const icon=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`

      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temp:Math.floor(data.main.temp),
        location:data.name,
        icon: icon
      })

    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching weather Data")
    }
  }
useEffect(()=>{
  search("London");
},[])
  


  return(
    <>
    <div className="head">
    <h2>Weather App</h2>  
    </div> 
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type='text' placeholder='Search'></input>
            <i class="fa-solid fa-magnifying-glass" onClick={()=>search(inputRef.current.value)}></i>
        </div>
        {weatherData
        ?
        <>
          <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temp}</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon}/>
            <div>
              <p>{weatherData.humidity}</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon}/>
            <div>
              <p>{weatherData.windSpeed}</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>
        :
        <></>}
        
    </div>
    </>  
    )
}

export default Weather
