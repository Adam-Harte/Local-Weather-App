//api call to get current location
$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
  var lat = data.lat;
  var lon = data.lon;
  getWeather(lat, lon);
});

//api call pasing in lat and lon to get local weather
//api weather temp starts at fahrenheit
function getWeather(lat, lon) {
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&" + "lon=" + lon + "&appid=34d867e6bd0decb3b401e02be6a10993&units=imperial", function(data) {
    var windKmh = (data.wind.speed).toFixed(1);
    var windMph = (windKmh / 1.609344).toFixed(1);
    var speedSwap = false;
    var humidity = data.main.humidity;
    var tempF = (data.main.temp).toFixed(1);
    var tempC = ((tempF - 32) * 5 / 9).toFixed(1); //&#8451;
    var tempSwap = false;
    //takes an array of objects, always pass first element to get correct data
    var description = data.weather[0].description;
    var icon = data.weather[0].icon;
    var city = data.name;
    var region = data.sys.country;
    //openweathermap api outputs time in unix code meaning the value need to be multiplied by 1000 for the conversion method to work
   
    $(".city").html(city);
    //set api data for area in location div
    $(".location").html(region);
    //set api data for description in description div
    $(".description").html(description);
    //add icon to icon div based on description
    $(".icon").append("<img src='http://openweathermap.org/img/w/" + icon + ".png'>");
    //set api data for temperature in temp div
    $(".temp").html(tempF);
    //set api data for wind & humidity in details div
    //change wind html function as it is removing the a tag for speed conversion
    $(".wind").html(windKmh);
    $(".humidity").html(humidity);
   
    getBackground(icon);
    
    $(".temp-conversion").on('click', function() {
      if (tempSwap === false) {
        $(".temp").html(tempC);
        $(".temp-conversion").html(" &#8451;");
        tempSwap = true;
      } else {
        $(".temp").html(tempF);
        $(".temp-conversion").html(" &#8457;");
        tempSwap = false;
      }
    });
    $(".speed-conversion").on('click', function() {
      if (speedSwap === false) {
        $(".wind").html(windMph);
        $(".speed-conversion").html(" Mph");
        speedSwap = true;
      } else {
        $(".wind").html(windKmh);
        $(".speed-conversion").html(" Kmh");
        speedSwap = false;
      }
      
    });

  });

}
//function to get and assing the correct background image based on the time of day
function getBackground(icon){
  if(icon.includes("d")){
    $("body").css("background", "url('http://i.imgur.com/Lsg8aD3.jpg')");
  }
  else{
    $("body").css("background", "url('http://i.imgur.com/tMVGqP6.jpg')");
  }
}
//http://i.imgur.com/PhFQkdl.png
//http://i.imgur.com/tMVGqP6.jpg