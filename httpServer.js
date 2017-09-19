const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res)=>{
  //route GET
  if(req.url.slice(1).includes('pets')){
    let url = req.url.slice(1).split('/');
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      let myData = data;
      if(url.length === 2){
        myData = JSON.parse(data);
        myData = myData[url[1]];
        myData = JSON.stringify(myData);
        res.setHeader('Content-Type', 'application/json');
      };
      if(url.length > 2 || !myData){
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
      }
      res.end(myData);
    });
  }
});

server.listen(8000);
