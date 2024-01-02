const switchBtn = document.querySelector(".switch-btn");
const sceneryBg = document.querySelector(".scenery-bg");
const temperatureText = document.querySelector(".temperature");
const weather = document.querySelector(".weather-wrapper");
const loader = document.querySelector(".loader");
const thermometr = document.querySelector(".thermometr");
const sky = document.querySelector(".sky");
const cloudySky = document.querySelector(".cloudy-sky");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const snow = document.querySelector(".snow");
const aurora = document.querySelector(".aurora");
const celBtn = document.querySelector(".thermometr-btn-cel");
const fahBtn = document.querySelector(".thermometr-btn-far");
const eventsList = document.querySelector(".events-list");
const cometEvent = document.querySelector(".comet-event");
const santa = document.querySelector(".santa-sleigh");
const rocket = document.querySelector(".rocket");

const debounce = (f,t) => {
    let tout;
    return () => {
        clearTimeout(tout);
        tout = setTimeout(f,t);
    };
}

function createSnow() {
  const snowFlake = document.createElement("div")
  snowFlake.classList.add("snow-flake");
  snow.appendChild(snowFlake);
  const start = Math.random() * 460;
  const duration = Math.random() * 3 + 2;
  const width = (Math.random() * 5) + 1;
  
  snowFlake.style.width = `${width}px`;
  snowFlake.style.height = `${width}px`;
  snowFlake.style.left = `${start}px`;
  snowFlake.style.animationDuration = `${duration}s`;
  debounce(() => {
    snowFlake.remove();
  }, duration*2000)();
}

function randomComet() {
  let cometWidth = ~((0.2 + Math.random()) * -5);
  if (cometWidth < 2) cometWidth = 2;
  const cometPosition = ~(Math.random()*-200);

  document.documentElement.style.setProperty('--comet-width', `${cometWidth}px`);
  document.documentElement.style.setProperty('--comet-position', `${cometPosition}px`);

  const newComet = `<div class="comet"></div>`;
  cometEvent.insertAdjacentHTML('beforeend', newComet);
}

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

function resetWeather(){
    moon.classList.remove("moon-at-night");
    sun.classList.remove("sun-day", "sunrise", "sun-night");
    sky.classList.remove("morning-sky", "night-sky", "cloudy-sky");
    aurora.classList.remove("aurora-active");
    cloudySky.style.transform = "translateY(-100%)";
    sceneryBg.style.opacity = "0";
}


const weatherControl = x => {
    switch (x) {
        case "sun":
            resetWeather();
            weather.style.transform = "rotate(0deg)";
            sun.classList.add("sun-day");
            changeDegree(-10);
            break;
        case "sunrise":
            resetWeather();
            weather.style.transform = "rotate(-60deg)";
            sky.classList.add("morning-sky")
            sun.classList.add("sunrise");
            changeDegree(-12);
            break;
        case "moon":
            resetWeather();
            weather.style.transform = "rotate(-120deg)";
            sky.classList.add("night-sky");
            sun.classList.add("sun-night");
            moon.classList.add("moon-at-night");
            changeDegree(-15);
            break;
        case "cloud":
            weather.style.transform = "rotate(-180deg)";
            cloudySky.style.transform = "translateY(0%)"; 
            sceneryBg.style.opacity = "0.1";
            changeDegree(-10);
            break;
        case "snow":
            const snowInterval = setInterval(createSnow, 100);
            debounce(() => {
              clearInterval(snowInterval);
            }, 20000)();
            weather.style.transform = "rotate(-240deg)";
            cloudySky.style.transform = "translateY(0%)"; 
            sceneryBg.style.opacity = "0.1";
            changeDegree(-5);
            break;
        case "aurora":
            resetWeather();
            weather.style.transform = "rotate(-300deg)"; 
            sky.classList.add("night-sky");
            sun.classList.add("sun-night");
            moon.classList.add("moon-at-night");
            aurora.classList.add("aurora-active");
            changeDegree(-2);
            break;
    }
}

let santaCount = 0;
let rocketCount = 0;

const eventsListClick = event => {
  event.target.style.pointerEvents = "none";
  switch (event.target.dataset.event) {
    case "santa":
      if (santaCount > 2) {
        alert("The deer are tired, try again later!");
        debounce(() => {
          santaCount = 0;
        }, 20000)();
      }
      else {
        santa.classList.add("santa-flying");
      }
      debounce(() => {
        santa.classList.remove("santa-flying");
        santaCount++;
        event.target.style.pointerEvents = "all";
        }, 7000)();
      break;
    case "rocket":
      if (rocketCount > 1) {
        alert("The rocket is not ready, try again later!");
        debounce(() => {
          rocketCount = 0;
        }, 30000)();
      }
      else {
        rocket.classList.add("rocket-flying");
      }
      debounce(() => {
        rocket.classList.remove("rocket-flying");
        rocketCount++;
        event.target.style.pointerEvents = "all";
        }, 6000)();
      break;
    case "comet":
      randomComet();
      debounce(() => {
        event.target.style.pointerEvents = "all";
        cometEvent.textContent = "";
        }, 2000)();
      break;
  }
}

const weatherClick = event => {
    if (event.target.nodeName !== "BUTTON") { return } else {
        loader.classList.add("loader-active");
        weatherControl(event.target.dataset.weather);
        debounce(()=>{loader.classList.remove("loader-active");}, 900)()
    }
}

const switchBtnClick = () => {
    if (switchBtn.getAttribute("data-switch") === "off") {
        changeSwitchBtn(true);
        weather.addEventListener("click", weatherClick);
        eventsList.addEventListener("click", eventsListClick)
    } else if (switchBtn.getAttribute("data-switch") === "on") {
        changeSwitchBtn(false);
        weather.removeEventListener("click", weatherClick);
    } 
}

switchBtn.addEventListener("click", switchBtnClick);

