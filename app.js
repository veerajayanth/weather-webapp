const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function (req,res) {
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function (req,res) {
  console.log(req.body.city);
  const cityname=req.body.city;
  const apikey ="d4050127b54e2a517652e35b9dde78e0";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=metric&appid="+apikey;

  https.get(url, function (response) {
    //console.log(response);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>weather description:"+desc+"</h1>");
      res.write("<h3>weather temp:"+temp+" <sup>.</sup>C</h3>");
      res.write("<img src="+imgUrl+">");
      console.log(desc);
      res.send();
    });
  });
});

// IDEA: d4050127b54e2a517652e35b9dde78e0
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}













app.listen(3000,function () {
  console.log("server running...");
})
