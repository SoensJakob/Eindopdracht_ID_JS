var html_clouds;
var html_stars;
var html_body;
var suncalc;

const listenToClouds = function(list) {
    for(i of list) {
        i.addEventListener("animationiteration", RandomClouds(i));
    }
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
    }
    else {
        console.log("DAY")
        html_clouds = document.querySelector(".js-clouds").children;
        listenToClouds(html_clouds);
    }

}


document.addEventListener('DOMContentLoaded', function() {
    console.log("Script Loaded!")
    html_body = document.body

    var currentTime = new Date();
    var lat = 50.82803;
    var long = 3.26487;
    
    var suncalc = SunCalc.getTimes(/*Date*/ currentTime, /*Number*/ lat, /*Number*/ long /*Number (default=0)*/ );
    // console.log(suncalc)
    // console.log(suncalc.dawn)


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
