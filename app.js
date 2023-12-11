const switchBtn = document.querySelector(".switch-btn");
const sceneryBg = document.querySelector(".scenery-bg");
const temperatureText = document.querySelector(".temperature");

function changeSwitchBtn(b) {
    const eventIcons = document.querySelectorAll(".events-icon");
    const weatherBtns = document.querySelectorAll(".weather-btn");
    if (b) {
        switchBtn.setAttribute("data-switch", "on");
        switchBtn.style.fill = "#6beef3d5";
        switchBtn.style.boxShadow = "inset -2px 2px 4px rgb(26, 25, 25), inset 2px -2px 4px rgba(61, 60, 60, 0.514), -2px 2px 4px rgb(32, 32, 32),inset -1px 1px 4px #6beef3d5";
        eventIcons.forEach(e => e.style.opacity = "1");
        weatherBtns.forEach(e => e.style.opacity = "1");
    } else {
        switchBtn.setAttribute("data-switch", "off");
        switchBtn.style.fill = "#ffffff50";
        switchBtn.style.boxShadow = "inset -2px 2px 4px rgb(26, 25, 25), inset 2px -2px 4px rgba(61, 60, 60, 0.514), -2px 2px 4px rgb(32, 32, 32)";
        eventIcons.forEach(e => e.style.opacity = "0");
        weatherBtns.forEach(e => e.style.opacity = "0");
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
    
})

