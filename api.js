import {
  changeList,
  zip,
  showloader,
  hideloader,
  weatherColRight,
  apikey,
} from "./script.js";

const cityChange = document.querySelector(".cityChange");
const countryChange = document.querySelector(".countryChange");
const countryTime = document.querySelector(".countryTime");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const temperature = document.querySelector(".temperature");
const highTemp = document.querySelector(".highTemp");
const lowTemp = document.querySelector(".lowTemp");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const wind = document.querySelector(".wind");
const windDirection = document.querySelector(".windDirection");
const atmosphericCondition = document.querySelector(".atmosphericCondition");
const weatherImg = document.querySelector(".weatherImg");

const countries = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Andorra: "AD",
  Angola: "AO",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahamas: "BS",
  Bahrain: "BH",
  Bangladesh: "BD",
  Barbados: "BB",
  Belarus: "BY",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bhutan: "BT",
  Bolivia: "BO",
  "Bosnia and Herzegovina": "BA",
  Botswana: "BW",
  Brazil: "BR",
  Brunei: "BN",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Burundi: "BI",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  "Cape Verde": "CV",
  "Central African Republic": "CF",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Comoros: "KM",
  "Congo (Brazzaville)": "CG",
  "Congo (Kinshasa)": "CD",
  "Costa Rica": "CR",
  Croatia: "HR",
  Cuba: "CU",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Djibouti: "DJ",
  Dominica: "DM",
  "Dominican Republic": "DO",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  Eritrea: "ER",
  Estonia: "EE",
  Eswatini: "SZ",
  Ethiopia: "ET",
  Fiji: "FJ",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Grenada: "GD",
  Guatemala: "GT",
  Guinea: "GN",
  "Guinea-Bissau": "GW",
  Guyana: "GY",
  Haiti: "HT",
  Honduras: "HN",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kiribati: "KI",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Maldives: "MV",
  Mali: "ML",
  Malta: "MT",
  "Marshall Islands": "MH",
  Mauritania: "MR",
  Mauritius: "MU",
  Mexico: "MX",
  Micronesia: "FM",
  Moldova: "MD",
  Monaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nauru: "NR",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  "North Korea": "KP",
  "North Macedonia": "MK",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Palau: "PW",
  Palestine: "PS",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  Samoa: "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  "Solomon Islands": "SB",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Suriname: "SR",
  Sweden: "SE",
  Switzerland: "CH",
  Syria: "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  "Timor-Leste": "TL",
  Togo: "TG",
  Tonga: "TO",
  "Trinidad and Tobago": "TT",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  Tuvalu: "TV",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Vanuatu: "VU",
  "Vatican City": "VA",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

export async function getWeatherData({
  cityValue,
  countryValue,
  latitudeValue,
  longitudeValue,
}) {
  try {
    changeList.forEach((list) => {
      list.classList.remove("active");
    });
    zip.classList.add("active");
    showloader();
    

    let response;
    if (cityValue && countryValue) {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${apikey}&units=metric`
      );
    } else if (latitudeValue && longitudeValue) {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apikey}&units=metric`
      );
    }

    if (!response.ok) {
      console.log("Api error");
      alert("Api error");
      hideloader();
      return;
    }

    const data = await response.json();
    if (cityValue && countryValue) {
      if (data.sys.country !== countries[countryValue]) {
        alert("Api error");
        hideloader();
      }
    }

    weatherColRight.style.display = "flex"; //display the right col

    hideloader();
    console.log(data);
    processWeatherData(data);
  } catch (err) {
    console.log("Fetch failed or API error:", err.message);
    const simulate = await simulateData();
    processWeatherData(simulate);
    weatherColRight.style.display = "flex";
    hideloader();
    alert("You're offline. Showing simulated weather data.");
  }
}
function simulateData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Simulated city",
        sys: {
          country: "SC",
          sunrise: 1746266279,
          sunset: 1746316613,
        },
        main: {
          temp: 18.03,
          temp_max: 19.32,
          temp_min: 16,
          humidity: 89,
          pressure: 1011,
        },
        visibility: 10000,
        weather: [
          {
            main: "broken clouds",
            icon: "04d",
          },
        ],
        wind: {
          speed: 2.57,
          deg: 190,
        },
      });
    }, 2000);
  });
}

function processWeatherData(data) {
  cityChange.innerHTML = `${data.name}`;
  countryChange.innerHTML = `${data.sys.country}`;
  function date() {
    const date = new Date();
    countryTime.innerHTML = `${date.toLocaleTimeString()}`;
  }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      date(); // update time when user comes back to the tab
    }
  });
  date();
  const sunriseTime = new Date(data.sys.sunrise * 1000); // multiply by 1000 to convert seconds to milliseconds
  sunrise.innerHTML = `${sunriseTime.toLocaleTimeString()};`; // shows in local time

  const sunsetTime = new Date(data.sys.sunset * 1000);
  sunset.innerHTML = `${sunsetTime.toLocaleTimeString()}`; //Sunset Time
  temperature.innerHTML = `${Math.floor(data.main.temp)}`; //Temperature
  atmosphericCondition.innerHTML = `${data.weather[0].main}`;
  highTemp.innerHTML = `${Math.floor(data.main.temp_max)}`;
  lowTemp.innerHTML = `${Math.floor(data.main.temp_min)}`;
  humidity.innerHTML = `${data.main.humidity}`;
  pressure.innerHTML = `${data.main.pressure}`;
  visibility.innerHTML = `${data.visibility / 1000}`;
  const windSpeedMS = data.wind.speed;
  const windSpeedKMH = Math.floor(windSpeedMS * 3.6);
  wind.innerHTML = `${windSpeedKMH}`;
  windDirection.textContent = `${data.wind.deg}`;
  const icon = `${data.weather[0].icon}`;
  weatherImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;
}
