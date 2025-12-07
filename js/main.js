function getAmPm() {
    const now = new Date();
    const hour = now.getHours(); // Returns 0-23

    // 0 (midnight) through 11 are AM. 
    // 12 (noon) through 23 are PM.
    if (hour < 12) {
        return 'AM';
    } else {
        return 'PM';
    }
}

function getFormattedDateString(dateObj) {
    // Check if the input is a valid Date object
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
        return "Invalid Date";
    }
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Use toLocaleDateString with the 'en-US' locale for English names
    return dateObj.toLocaleDateString('en-US', options);
}

function zeroPad(num) {
    const numString = String(num);
    if (numString.length === 1) {
        return "0" + numString;
    }
    return numString;
}

function updateClock() {
    const hourHand = document.querySelector('.arrow-hour');
    const minuteHand = document.querySelector('.arrow-min');
    const secondHand = document.querySelector('.arrow-sec');

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const secondsDegrees = seconds * 6;
    const minutesDegrees = (minutes * 6) + (seconds * 0.1);
    const hoursDegrees = ((hours % 12) * 30) + (minutes * 0.5);

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    document.querySelector(`.time .main-text h1`).innerHTML=`${zeroPad(hours)}:${zeroPad(minutes)} ${getAmPm()}`
    document.querySelector(`.time .main-text p`).innerHTML=`${getFormattedDateString(now)}`
}

async function updateWeather(lat=50,long=20,location_label="Krakow, PO") {
    const wmoWeatherCodes = [
        { "code": 0, "description": "Clear sky" },
        { "code": 1, "description": "Clouds dissolving" },
        { "code": 2, "description": "Sky unchanged" },
        { "code": 3, "description": "Clouds forming" },
        { "code": 4, "description": "Low visibility" },
        { "code": 5, "description": "Haze present" },
        { "code": 6, "description": "Widespread dust" },
        { "code": 7, "description": "Wind dust" },
        { "code": 8, "description": "Dust whirls" },
        { "code": 9, "description": "Duststorm" },
        { "code": 10, "description": "Light mist" },
        { "code": 11, "description": "Patches fog" },
        { "code": 12, "description": "Continuous fog" },
        { "code": 13, "description": "Lightning visible" },
        { "code": 14, "description": "Distant rain" },
        { "code": 15, "description": "Far rain" },
        { "code": 16, "description": "Near rain" },
        { "code": 17, "description": "Thunderstorm dry" },
        { "code": 18, "description": "Squalls present" },
        { "code": 19, "description": "Funnel cloud" },
        { "code": 20, "description": "Non-shower drizzle" },
        { "code": 21, "description": "Non-shower rain" },
        { "code": 22, "description": "Non-shower snow" },
        { "code": 23, "description": "Non-shower mixed" },
        { "code": 24, "description": "Freezing drizzle" },
        { "code": 25, "description": "Rain showers" },
        { "code": 26, "description": "Snow showers" },
        { "code": 27, "description": "Hail showers" },
        { "code": 28, "description": "Dense fog" },
        { "code": 29, "description": "Thunderstorm active" },
        { "code": 30, "description": "Slight duststorm" },
        { "code": 31, "description": "Unchanged duststorm" },
        { "code": 32, "description": "Increasing duststorm" },
        { "code": 33, "description": "Severe duststorm" },
        { "code": 34, "description": "Unchanged severe" },
        { "code": 35, "description": "Increasing severe" },
        { "code": 36, "description": "Slight drifting" },
        { "code": 37, "description": "Heavy drifting" },
        { "code": 38, "description": "Slight blowing" },
        { "code": 39, "description": "Heavy blowing" },
        { "code": 40, "description": "Distant fog" },
        { "code": 41, "description": "Fog patches" },
        { "code": 42, "description": "Fog sky-visible" },
        { "code": 43, "description": "Fog sky-invisible" },
        { "code": 44, "description": "Thicker fog" },
        { "code": 45, "description": "Thick fog" },
        { "code": 46, "description": "Fog clearing" },
        { "code": 47, "description": "Thick fog clearing" },
        { "code": 48, "description": "Rime fog" },
        { "code": 49, "description": "Rime fog invisible" },
        { "code": 50, "description": "Slight drizzle" },
        { "code": 51, "description": "Slight drizzle" },
        { "code": 52, "description": "Moderate drizzle" },
        { "code": 53, "description": "Moderate drizzle" },
        { "code": 54, "description": "Heavy drizzle" },
        { "code": 55, "description": "Heavy drizzle" },
        { "code": 56, "description": "Slight freezing" },
        { "code": 57, "description": "Heavy freezing" },
        { "code": 58, "description": "Slight mixed" },
        { "code": 59, "description": "Heavy mixed" },
        { "code": 60, "description": "Slight rain" },
        { "code": 61, "description": "Slight rain" },
        { "code": 62, "description": "Moderate rain" },
        { "code": 63, "description": "Moderate rain" },
        { "code": 64, "description": "Heavy rain" },
        { "code": 65, "description": "Heavy rain" },
        { "code": 66, "description": "Slight freezing" },
        { "code": 67, "description": "Heavy freezing" },
        { "code": 68, "description": "Slight rain/snow" },
        { "code": 69, "description": "Heavy rain/snow" },
        { "code": 70, "description": "Slight snow" },
        { "code": 71, "description": "Slight snow" },
        { "code": 72, "description": "Moderate snow" },
        { "code": 73, "description": "Moderate snow" },
        { "code": 74, "description": "Heavy snow" },
        { "code": 75, "description": "Heavy snow" },
        { "code": 76, "description": "Ice crystals" },
        { "code": 77, "description": "Snow grains" },
        { "code": 78, "description": "Ice splinters" },
        { "code": 79, "description": "Ice pellets" },
        { "code": 80, "description": "Slight shower" },
        { "code": 81, "description": "Moderate shower" },
        { "code": 82, "description": "Violent shower" },
        { "code": 83, "description": "Slight mixed" },
        { "code": 84, "description": "Heavy mixed" },
        { "code": 85, "description": "Slight snow" },
        { "code": 86, "description": "Heavy snow" },
        { "code": 87, "description": "Slight soft" },
        { "code": 88, "description": "Heavy soft" },
        { "code": 89, "description": "Slight hard" },
        { "code": 90, "description": "Heavy hard" },
        { "code": 91, "description": "Thunderstorm slight" },
        { "code": 92, "description": "Thunderstorm heavy" },
        { "code": 93, "description": "Thunderstorm snow" },
        { "code": 94, "description": "Thunderstorm heavy" },
        { "code": 95, "description": "Thunderstorm rain/snow" },
        { "code": 96, "description": "Thunderstorm hail" },
        { "code": 97, "description": "Heavy thunderstorm" },
        { "code": 98, "description": "Thunderstorm dust" },
        { "code": 99, "description": "Heavy thunderstorm" }
    ];


    try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=weather_code,temperature_2m,is_day`);
    const data = await response.json();
    data;
    console.log(data)

    icon_filename=data.current.weather_code;
    if( (data.current.weather_code==0 || data.current.weather_code==1 || data.current.weather_code==2) && data.current.is_day==0) {
        icon_filename+="n";
    }
    icon_filename=`./styles/arvon/assets/weather/${icon_filename}.png`
    document.querySelector(`.weather .information .icon`).src=icon_filename;

    document.querySelector(`.information h1`).innerHTML=data.current.temperature_2m;
    document.querySelector(`.information span.condition`).innerHTML=wmoWeatherCodes.find(item => item.code==data.current.weather_code).description;

    document.querySelector(`.last-updated .time`).innerHTML=`${zeroPad((new Date()).getHours())}:${zeroPad((new Date()).getMinutes())} ${getAmPm()}`

    document.querySelector(`.weather .location span`).innerHTML=location_label;

    document.querySelector(`.weather`).style.opacity=1;
    }
    catch (ERR_BLOCKED_BY_CLIENT) {}
}

function showLoadingAnim() {
    document.querySelector(`.loading`).style="opacity: 1; transform: translateY(-75%) translate(-50%) scale(1);";
}

function hideLoadingAnim() {
    document.querySelector(`.loading`).style="";
}

function clickUser(userNode) {
    document.querySelectorAll(".user.selected").forEach(item => item.classList.remove("selected"))
    userNode.classList.add("selected");
    document.querySelector(`.login-input h1`).innerHTML=userNode.querySelector(".name").innerHTML;
    document.querySelector(`.center .pfp .pfp-wrap`).style.backgroundImage=userNode.querySelector(".pfp .pfp-wrap").style.backgroundImage;
    document.querySelector(`.center .pfp .blurred-background-image`).style.backgroundImage=userNode.querySelector(".pfp .pfp-wrap").style.backgroundImage;
    document.querySelector(`.center`).style.opacity="1";
}

function initializeGUI() {
    document.querySelector(`.body-overlay`).style.opacity="0";
    document.querySelector(`.body-background`).style.transform="scale(1)";
    document.querySelector(`.bottom`).style.transform="translateY(0)";

    // document.querySelectorAll(`.user`).forEach(userNode => {
    //     userNode.addEventListener("click", function() {
    //         clickUser(userNode)
    //     })
    // })


    updateClock();
    setInterval(updateClock, 1000);
    if(weather_configs) 
    {
        updateWeather(weather_configs.latitude,weather_configs.longitude,weather_configs.location_name)
    }
    else
    {
        updateWeather();
    }

    //document.querySelector(`.user:not(.template)`).click();
}

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector("#de_choose").value=window.lightdm.default_session
});