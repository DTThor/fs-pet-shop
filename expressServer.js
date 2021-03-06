const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// // POST /pets gets JSON bodies
// app.post('/pets', petsPath, function (req, res) {
//   fs.writeFile(petsPath, req.body, function(err, petsJSON){
//     if (!req.body){
//     return res.sendStatus(400)
//     }
//   // create user in req.body
//   req.body = 'yo';
//   res.send(req.body)
//   })
// })

app.disable('x-powered-by');

app.get('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if(err){
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON);
    res.send(pets)
  });
});

app.get('/pets/:id', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if(err){
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

    if(id < 0 || id >= pets.length || Number.isNaN(id)){
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'application/json')
    res.send(pets[id]);
  })
})

app.use(function(req, res){
  res.sendStatus(404);
});

app.listen(port, function(){
  console.log(`Listening on port ${port}!`);
});

module.exports = app;
