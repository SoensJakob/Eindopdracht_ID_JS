var html_clouds;
var html_stars;
var html_body;
var html_icon
var suncalc;

var lat = 50.82803;
var long = 3.26487;

const listenToClouds = function(list) {
    for(i of list) {
        i.addEventListener("animationiteration", RandomClouds(i));
    }
}

const setSunPosition = function() {
    currentTime = new Date();

    var suncalcTimes = SunCalc.getTimes(/*Date*/ currentTime, /*Number*/ lat, /*Number*/ long /*Number (default=0)*/ );

    var suncalcPosition = SunCalc.getPosition(/*Date*/ currentTime, /*Number*/ lat, /*Number*/ long /*Number (default=0)*/ );

    //SET time values for sun
    setSunTimeValues(suncalcTimes.sunrise, suncalcTimes.sunset);

    // RESET scale 
    html_icon.style.transform = "scale(1)";

    // GET and SET altitude
    var altitude = suncalcPosition.altitude * 100;
    html_icon.style.bottom = altitude + "%";

    //GET and SET Horizontal value 
    html_icon.style.left = 90 + "%";

    
    
    var totalMinutes = ((suncalcTimes.sunset.getTime() - suncalcTimes.sunrise.getTime()) / 1000) / 60;

    var diff = ((currentTime.getTime() - suncalcTimes.sunrise.getTime()) / 1000) / 60;
    console.log(diff)

    var percetage_timeleft = diff / totalMinutes * 100;
    console.log(percetage_timeleft)

    html_icon.style.left = percetage_timeleft + "%"

}

const setMoonPosition = function() {
    currentTime = new Date();

    var suncalcTimes = SunCalc.getTimes(/*Date*/ currentTime, /*Number*/ lat, /*Number*/ long /*Number (default=0)*/ );

    var suncalcPosition = SunCalc.getMoonPosition(/*Date*/ currentTime, /*Number*/ lat, /*Number*/ long /*Number (default=0)*/ );

    console.log(suncalcPosition)
    // GET and SET Vertical value
    var altitude = suncalcPosition.altitude * 100;
    html_icon.style.bottom = altitude + "%";
    console.log(altitude);

    // GET and SET size
    var scale = 410000 / suncalcPosition.distance
    console.log(scale)
    html_icon.style.transform = `scale(${scale})`;

    // SET Horizontal value static
    html_icon.style.left = 90 + "%";

}

const setTimeValues = function(rise, fall) {
    var html_fall = document.querySelector(".js-fall");
    var html_rise = document.querySelector(".js-rise");

    html_rise.innerHTML = `${rise.getHours()}:${rise.getMinutes()}`;
    html_fall.innerHTML = `${fall.getHours()}:${fall.getMinutes()}`;
}


const RandomClouds = function(i) {
    i.style.animationDelay = `${Math.floor(Math.random() * 10) + 1}s`; 
    i.style.top = `${Math.floor(Math.random() * 65) + 1}%` ;
    i.style.transform += `rotate(${Math.floor(Math.random() * 30) - 30}deg)`;
}

const RandomStars = function(list) {
    for(i of list) {
        i.style.animationDuration = `${Math.floor(Math.random() * 6) + 2}s`;
        i.style.top = `${Math.floor(Math.random() * 70) + 1}%`;
        i.style.left = `${Math.floor(Math.random() * 99) + 1}%`;
    }
}

const RefreshBody = function() {

    if (html_body.classList.contains("is-night")) {
        console.log("NIGHT")
        html_stars = document.querySelector(".js-stars").children;
        RandomStars(html_stars);
        setMoonPosition()
    }
    else {
        console.log("DAY")
        html_clouds = document.querySelector(".js-clouds").children;
        listenToClouds(html_clouds);
        setSunPosition();
    }

}


document.addEventListener('DOMContentLoaded', function() {
    console.log("Script Loaded!")

    html_body = document.body
    html_icon = document.querySelector(".js-icon")

    var currentTime = new Date();
    
    var suncalcTimes = SunCalc.getTimes(/*Date*/ currentTime, /*Number*/ lat, /*Number*/ long /*Number (default=0)*/ );

    
    if (currentTime > suncalcTimes.sunset) {
        setMoonPosition();
        html_body.classList.add("is-night");
    }
    else {
        setSunPosition();
    }


    RefreshBody();

    var sw = document.querySelectorAll(".js-switch")

    for (i of sw ) {
        i.addEventListener("change", function() {
            if (this.value == "Day") {
                html_body.classList.remove("is-night");
                RefreshBody();
            }
            else if (this.value == "Night") {
                html_body.classList.add("is-night");
                RefreshBody();
            }
        });
    }
    


});
