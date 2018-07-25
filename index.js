const express = require('express');
const request = require('request');
const bodyParser =require('body-parser');
const PORT = process.env.PORT;
let app =express();
let apikey ='703c71ff250bfd14be54fed789db2656';



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get('/', function (req,res){
  res.render('index',{weather:null,error:'error'});
})
app.post('/',function(req,res){
  let city =req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  request(url, function (err, response, body) {
    if (err){
      res.render('index',{weather:null,error:'Error please try'})
    }else {
      let weather =  JSON.parse(body)
      if(weather.main == undefined){
      res.render('index',{weather:null,error:'some real place'})}
    else{
      let weatherText =`Its ${weather.main.temp}degrees in ${weather.name}!`;
      res.render('index',{weather: weatherText,error:null});
    }

    }
});
})

app.listen(PORT,function(err){
  if (err){
    console.log(err);
  }else{
    console.log('Example app listening on port 3000!');
  }

});
