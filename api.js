import {changeList,zip,showloader,hideloader,weatherColRight,apikey} from "./script.js"

const cityChange = document.querySelector('.cityChange');
const countryChange = document.querySelector('.countryChange');
const countryTime = document.querySelector('.countryTime');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const temperature = document.querySelector('.temperature');
const highTemp = document.querySelector('.highTemp');
const lowTemp = document.querySelector('.lowTemp');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const visibility = document.querySelector('.visibility');
const wind = document.querySelector('.wind');
const windDirection = document.querySelector('.windDirection')
const atmosphericCondition = document.querySelector('.atmosphericCondition');
const weatherImg = document.querySelector('.weatherImg');

export async function getWeatherData({cityValue,countryValue,latitudeValue,longitudeValue}) {

    try{
        changeList.forEach((list)=>{
            list.classList.remove('active');
        })
        zip.classList.add('active');
        showloader();

        
        let response;
        if(cityValue && countryValue){
            response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${apikey}&units=metric`
            );
        }else if(latitudeValue && longitudeValue){
            response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apikey}&units=metric`
            );
        }
    
        if(!response.ok){
            console.log("Api error");
           
            return;
        }
     
        const data = await response.json()

        weatherColRight.style.display = 'flex';  //display the right col

        hideloader()
        console.log(data);
        processWeatherData(data);
    }
    catch(err){
        console.log("Fetch failed or API error:", err.message);     
        const simulate = await simulateData(); 
        processWeatherData(simulate);          
        weatherColRight.style.display = 'flex';
        hideloader();   
        alert("You're offline. Showing simulated weather data.");
    }
    

}
function simulateData(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                name:"Simulated city",
                sys:{ 
                    country:"SC",
                    sunrise: 1746266279,
                    sunset:1746316613,
                },
                main:{
                    temp:18.03,
                    temp_max:19.32,
                    temp_min:16,
                    humidity:89,
                    pressure:1011,

                },
                visibility:10000,
                weather:[{
                        main:'broken clouds',
                        icon:"04d",
                    }],
                wind:{
                    speed:2.57,
                    deg:190
                }

            })
        },2000)
    })
}



function processWeatherData(data){
    cityChange.innerHTML  = `${data.name}`
    countryChange.innerHTML = `${data.sys.country}`
    function date(){
        const date = new Date;
        countryTime.innerHTML = `${date.toLocaleTimeString()}`
    }
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
          date(); // update time when user comes back to the tab
        }
      });
    date()
    const sunriseTime = new Date(data.sys.sunrise * 1000); // multiply by 1000 to convert seconds to milliseconds
    sunrise.innerHTML = `${sunriseTime.toLocaleTimeString()};` // shows in local time

    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunset.innerHTML = `${sunsetTime.toLocaleTimeString()}`;   //Sunset Time
    temperature.innerHTML = `${Math.floor(data.main.temp)}`;   //Temperature
    atmosphericCondition.innerHTML = `${data.weather[0].main}`;  
    highTemp.innerHTML = `${Math.floor(data.main.temp_max)}`;
    lowTemp.innerHTML = `${Math.floor(data.main.temp_min)}`;
    humidity.innerHTML = `${data.main.humidity}`;
    pressure.innerHTML = `${data.main.pressure}`;
    visibility.innerHTML = `${data.visibility/1000}`;
    const windSpeedMS = data.wind.speed;
    const windSpeedKMH = Math.floor((windSpeedMS * 3.6)); 
    wind.innerHTML = `${windSpeedKMH}`; 
    windDirection.textContent = `${data.wind.deg}`;
    const icon = `${data.weather[0].icon}`;
    weatherImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
    
    
}