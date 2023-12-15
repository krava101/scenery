const switchBtn = document.querySelector(".switch-btn");
const sceneryBg = document.querySelector(".scenery-bg");
const temperatureText = document.querySelector(".temperature");
const weather = document.querySelector(".weather-wrapper");
const thermometr = document.querySelector(".thermometr");
const sky = document.querySelector(".sky");
const cloudySky = document.querySelector(".cloudy-sky");
const sunMoon = document.querySelector(".sun-moon");
const celBtn = document.querySelector(".thermometr-btn-cel");
const fahBtn = document.querySelector(".thermometr-btn-far");



function changeSwitchBtn(b) {
    const eventIcons = document.querySelectorAll(".events-icon");
    const eventBtns = document.querySelectorAll(".events-btn")
    const weatherBtns = document.querySelectorAll(".weather-btn");
    if (b) {
        switchBtn.setAttribute("data-switch", "on");
        switchBtn.style.fill = "#6beef3d5";
        switchBtn.style.boxShadow = "inset -2px 2px 4px rgb(26, 25, 25), inset 2px -2px 4px rgba(61, 60, 60, 0.514), -2px 2px 4px rgb(32, 32, 32),inset -1px 1px 4px #6beef3d5";
        eventIcons.forEach(e => e.style.opacity = "1");
        eventBtns.forEach(e => e.style.pointerEvents = "all");
        weatherBtns.forEach(e => { e.style.opacity = "1"; e.style.pointerEvents = "all"});
        sceneryBg.style.opacity = "0";
        temperatureText.textContent = "-10°C";
        temperatureText.style.color = "#ffffff50";
    } else {
        switchBtn.setAttribute("data-switch", "off");
        switchBtn.style.fill = "#ffffff50";
        switchBtn.style.boxShadow = "inset -2px 2px 4px rgb(26, 25, 25), inset 2px -2px 4px rgba(61, 60, 60, 0.514), -2px 2px 4px rgb(32, 32, 32)";
        eventIcons.forEach(e => e.style.opacity = "0");
        eventBtns.forEach(e => e.style.pointerEvents = "none");
        weatherBtns.forEach(e => { e.style.opacity = "0"; e.style.pointerEvents = "none"});
        sceneryBg.style.opacity = "1";
        temperatureText.textContent = "";
        temperatureText.style.color = "#ffffff00";
    }
}

const toCel = x => temperatureText.textContent = `${x}°C`;
const toFah = x => temperatureText.textContent = `${(Math.round(((9 * x / 5) + 32) * 10) / 10)}°F`;

function changeDegree(x) {
    thermometr.addEventListener("click", event => {
        if (event.target.dataset.c) {
            celBtn.setAttribute("data-c", "on");
            fahBtn.setAttribute("data-f", "off");
            toCel(x);
        } else if (event.target.dataset.f) {
            celBtn.setAttribute("data-c", "off");
            fahBtn.setAttribute("data-f", "on");
            toFah(x);
        }
    })
    celBtn.getAttribute("data-c") === "on" ? toCel(x) : toFah(x);
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
            changeDegree(-10);
            break;
        case "sunrise":
            weather.style.transform = "rotate(-60deg)";
            sky.classList.add("morning-sky")
            sunMoon.classList.add("sunrise");
            changeDegree(-12);
            break;
        case "moon":
            weather.style.transform = "rotate(-120deg)";
            sky.classList.add("night-sky");
            sunMoon.classList.add("moon");
            changeDegree(-15);
            break;
        case "cloud":
            weather.style.transform = "rotate(-180deg)";
            cloudySky.style.transform = "translateY(0%)"; 
            sceneryBg.style.opacity = "0.1";
            changeDegree(-10);
            break;
        case "snow":
            weather.style.transform = "rotate(-240deg)";
            cloudySky.style.transform = "translateY(0%)"; 
            sceneryBg.style.opacity = "0.1";
            changeDegree(-5);
            break;
        case "rain":
            weather.style.transform = "rotate(-300deg)";
            cloudySky.style.transform = "translateY(0%)"; 
            sceneryBg.style.opacity = "0.1";
            changeDegree(0);
            break;
    }
}


function switchBtnClick(){
    function weatherClick(event) {
        if (event.target.nodeName !== "BUTTON") { return } else {
            weatherControl(event.target.dataset.weather);
        }
    }
    
    if (switchBtn.getAttribute("data-switch") === "off") {
        changeSwitchBtn(true);
        weather.addEventListener("click", weatherClick);
    } else if (switchBtn.getAttribute("data-switch") === "on") {
        changeSwitchBtn(false);
        weather.removeEventListener("click", weatherClick);
    } 
}

switchBtn.addEventListener("click", switchBtnClick)

