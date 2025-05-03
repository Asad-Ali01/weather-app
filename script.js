const loader = document.querySelector('.loader');
const body = document.querySelector('body');
export function showloader(){
    loader.style.display = 'flex';
    body.style.overflow = 'hidden';
}

export function hideloader(){
    loader.style.display = 'none';
    body.style.overflow = 'visible';
}

// Nav section start
const navList = document.querySelectorAll('nav ul li a');
const navUl = document.querySelector('nav ul');
const hamburger = document.querySelector('.hamburger');

const inputTag = document.querySelector('input');
hamburger.addEventListener('click',(e)=>{
    // navUl.classList.toggle('active')
    e.stopPropagation();
    const isHidden = getComputedStyle(navUl).display === 'none';
    const isActive = navUl.classList.contains('active');
    if(isHidden || !isActive){
        navUl.style.display = 'flex';
        body.classList.add('dark-overlay');
        navUl.classList.add('active');
        navUl.classList.add('active')
        body.style.overflow = 'hidden';
       
    }else{
        body.classList.remove('dark-overlay');
        body.style.overflow = 'auto';
    }
    
})
// const check = document.querySelector('#weather .zipCountryCode input')

document.addEventListener('click', (e) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const clickedOnlink = e.target.tagName ==='A'
    if (isMobile && !navUl.contains(e.target) && !hamburger.contains(e.target) || clickedOnlink ) {
      body.classList.remove('dark-overlay');
        navUl.classList.remove('active')
        // check.style.border = 'black'
      body.style.overflow = 'auto';
    }
  });
  

navList.forEach((link)=>{
   link.addEventListener('click',()=>{
    
   document.querySelectorAll('nav ul li').forEach((li)=> {
    li.classList.remove('active')
    
});
    link.parentElement.classList.add("active");
   })
     
})
// Nav section end



// Weather section start
export const changeList = document.querySelectorAll('#weather .userSection ul li')
changeList.forEach((list)=> {
   list.addEventListener('click',()=>{
    changeList.forEach((l)=> l.classList.remove('active'));
    
    list.classList.add('active');
   })
    
})
export const zip = document.querySelector('.zip')
const city = document.querySelector('.city')
const geographic = document.querySelector('.geographic')
const zipCountryCode = document.querySelector('#zipCountryCode')
const cityCountry = document.querySelector('#cityCountry')
const geographicCordinator = document.querySelector('#geographicCordinator')
const zipCode = document.querySelector('#zipCode');
const countryCode = document.querySelector('#countryCode');
const weatherCol = document.querySelector('.col')
const weatherColLeft = document.querySelector('.col-left')
export const weatherColRight = document.querySelector('.col-right')
// City and country name
const cityName = document.querySelector('#cityName');
const countryName = document.querySelector('#countryName');
// geographicCordinator
const latitude = document.querySelector('#latitude');
const longitude = document.querySelector('#longitude');

zip.addEventListener('click',()=>{
    cityCountry.style.display = 'none';
    geographicCordinator.style.display = 'none';
    zipCountryCode.style.display  ='flex';
    weatherColRight.style.display = 'none';  //hide the right col 
       // Clear other inputs
       cityName.value = '';
       countryName.value = '';
       latitude.value = '';
       longitude.value = '';
})
city.addEventListener('click',()=>{
    zipCountryCode.style.display = 'none';
    geographicCordinator.style.display = 'none';
    cityCountry.style.display  ='flex'
    weatherColRight.style.display = 'none';  //hide the right col 
        // Clear other inputs
        zipCode.value = '';
        countryCode.value = ''
        latitude.value = '';
        longitude.value = '';
})

geographic.addEventListener('click',()=>{
    zipCountryCode.style.display = 'none';
    cityCountry.style.display = 'none';
    geographicCordinator.style.display  ='flex'
    weatherColRight.style.display = 'none';  //hide the right col 
        // Clear other inputs
        zipCode.value = '';
        countryCode.value = ''
        latitude.value = '';
        longitude.value = '';
})

let rightDisplay  = getComputedStyle(weatherColRight).display;
// rightDisplay = 'flex';
if(rightDisplay == 'none'){
    weatherCol.style.justifyContent = 'flex-start'
}



// For user who want to get weather data using city and country
const CityCountry = (function(){
    cityCountry.addEventListener('submit',(e)=>{
        e.preventDefault();
        const cityValue = cityName.value.trim();
        const countryValue = countryName.value.trim();
       
        if(!cityValue || !countryValue){
            alert("Please enter both city and country name.")
            return;
        }
        cityName.value = '';
        countryName.value = '';
        
        getWeatherData({cityValue,countryValue});
    })
})()



const geographicCordinatorFunction = (()=>{
  
    geographicCordinator.addEventListener('submit',(e)=>{
        e.preventDefault();
        const latitudeValue = latitude.value.trim();
        const longitudeValue = longitude.value.trim();
        if(!latitudeValue || !longitudeValue){
            alert("Please enter both latitude and longitude.")
            return;
        }
        latitude.value = '';
        longitude.value = '';
        getWeatherData({latitudeValue,longitudeValue});
    })
})()

export const apikey = "e3a3007c80f1a8d5cc6347f061c1282a";

import {getWeatherData} from "./api.js"

// Weather section end

