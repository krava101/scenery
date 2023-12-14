const switchBtn = document.querySelector(".switch-btn");
const sceneryBg = document.querySelector(".scenery-bg");
const temperatureText = document.querySelector(".temperature");
const weather = document.querySelector(".weather-wrapper");
const sky = document.querySelector(".sky");
const cloudySky = document.querySelector(".cloudy-sky");
const sunMoon = document.querySelector(".sun-moon");


function changeSwitchBtn(b) {
    const eventIcons = document.querySelectorAll(".events-icon");
    const weatherBtns = document.querySelectorAll(".weather-btn");
    if (b) {
        switchBtn.setAttribute("data-switch", "on");
        switchBtn.style.fill = "#6beef3d5";
        switchBtn.style.boxShadow = "inset -2px 2px 4px rgb(26, 25, 25), inset 2px -2px 4px rgba(61, 60, 60, 0.514), -2px 2px 4px rgb(32, 32, 32),inset -1px 1px 4px #6beef3d5";
        eventIcons.forEach(e => e.style.opacity = "1");
        weatherBtns.forEach(e => { e.style.opacity = "1"; e.style.pointerEvents = "all"});
    } else {
        switchBtn.setAttribute("data-switch", "off");
        switchBtn.style.fill = "#ffffff50";
        switchBtn.style.boxShadow = "inset -2px 2px 4px rgb(26, 25, 25), inset 2px -2px 4px rgba(61, 60, 60, 0.514), -2px 2px 4px rgb(32, 32, 32)";
        eventIcons.forEach(e => e.style.opacity = "0");
        weatherBtns.forEach(e => { e.style.opacity = "0"; e.style.pointerEvents = "none" });
    }
}


function weatherControl(x) {
    sunMoon.classList.remove("sun", "sunrise", "moon");
    sky.classList.remove("morning-sky", "night-sky", "cloudy-sky");
    cloudySky.style.transform = "translateY(-100%)";
    sceneryBg.style.opacity = "0";
    switch (x) {
        case "sun":
            weather.style.transform = "rotate(0deg)";
            sunMoon.classList.add("sun");
            break;
        case "sunrise":
            weather.style.transform = "rotate(-60deg)";
            sky.classList.add("morning-sky")
            sunMoon.classList.add("sunrise");
            break;
        case "moon":
            weather.style.transform = "rotate(-120deg)";
            sky.classList.add("night-sky");
            sunMoon.classList.add("moon");
            break;
        case "cloud":
            weather.style.transform = "rotate(-180deg)";
            cloudySky.style.transform = "translateY(0%)"; 
            sceneryBg.style.opacity = "0.1";
            break;
        case "snow":
            weather.style.transform = "rotate(-240deg)";
            cloudySky.style.transform = "translateY(0%)"; 
            sceneryBg.style.opacity = "0.1";
            break;
        case "rain":
            weather.style.transform = "rotate(-300deg)";
            cloudySky.style.transform = "translateY(0%)"; 
            sceneryBg.style.opacity = "0.1";
            break;
    }
}


switchBtn.addEventListener("click", event => {
    if (switchBtn.getAttribute("data-switch") === "off") {
        changeSwitchBtn(true);
        sceneryBg.style.opacity = "0";
        temperatureText.textContent = "-10°C";
        temperatureText.style.color = "#ffffff50"
    } else if (switchBtn.getAttribute("data-switch") === "on") {
        changeSwitchBtn(false);
        sceneryBg.style.opacity = "1";
        temperatureText.textContent = "";
        temperatureText.style.color = "#ffffff00"
    }
    
    weather.addEventListener("click", event => {
        if (event.target.nodeName !== "BUTTON") {return} else {
            weatherControl(event.target.dataset.weather);
        }
    }) 
})

