// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/* My optional solution*/
//Settiin proxy to return full ip//
app.enable('trust proxy')

app.get('/api/whoami', (req, res) => {
  res.send({
      "ipaddress": req.ip,
      "language": req.headers["accept-language"],
      "software": req.headers["user-agent"]
  });
});


/*My optional solution 3*/
app.get("/api/whoami", (req, res) => {
  let myIP = req.header("X-Forwarded-For").split(',')[0];  // X-Forwarded-For method gets three IP addresses--client, proxy1, proxy 2
  let myLanguage = req.header('Accept-Language');
  let mySystem = req.header('User-Agent');
  res.json({
    ipaddress: myIP,
    language: myLanguage,
    software: mySystem
  });
});


// your first API endpoint...
//My solution 1(still not able to define my codes/outputs)
//This is an apiwith one route api/whoami , it returns your ip address, language, and user agent which can all be retrievd from our request object
//Setting up the route
/*creating a javascrpt object for return*/ 
//let responseObject = {}

//app.get('/api/whoami', function (req, res) {
  //1# getting ip
  //responseObject["ipaddress"] = request.ip/* This will give a weird ip when you refresh it will give just th
//e most recent ip, but if you want the users full ip on its curent operating sytem we do this*/
//app.enable('trust proxy') /* this will retrace to the user machine and show its current ip in full*/
//#2 requesting lang
//If we go to our express doc website we will see in the req.get(field) , what it doess is if we give it a method inside that field() it return te contents in the field. So let try it
//responseObject['language'] = request.get('Accept-Language')
//#3 Returning the software and computer info in the sofware key
//Still in our express doc website software infos are stored in the User-Agent field, so we will use thesame req method as we did on the lang field
//responseObject['sofware'] = request.get('User-Agent') 
/*calling a json object on our created js object above for response*/ 
  //res.json(responseObject);
//});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
