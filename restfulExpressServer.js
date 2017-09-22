const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const morgan = require('morgan');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('short'));
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

app.post('/pets', function(req, res, next){
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if(err){
      return next(err);
    }
    const pets = JSON.parse(petsJSON);
    const age = Number.parseInt(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;
    if (Number.isNaN(age) || !kind || !name){
      return res.sendStatus(400);
    }
    const pet = { age, kind, name };
    pets.push(pet);
    const newPets = JSON.stringify(pets);
    fs.writeFile(petsPath, newPets, function(err){
      if(err){
        return next(err);
      }
      res.send(pet);
    });
  });
});







app.use(function(req, res){
  res.sendStatus(404);
});

app.listen(port, function(){
  console.log(`Listening on port ${port}!`);
});

module.exports = app;
