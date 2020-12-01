const RandomPosition = function(list) {

    for (i of list) {
        i.style.top = `${Math.floor(Math.random() * 40) + 10}%`;
        i.style.left = `${Math.floor(Math.random() * 100) + 10}%`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Script Loaded!")

    var currentTime = new Date();
    var lat = 50.82803;
    var long = 3.26487;
    
    var suncalc = SunCalc.getTimes(/*Date*/ currentTime, /*Number*/ lat, /*Number*/ long /*Number (default=0)*/ );
    // console.log(suncalc)
    // console.log(suncalc.dawn)


    var stars = document.querySelector(".js-stars");

    var stars = stars.children;

    RandomPosition(stars);
});
