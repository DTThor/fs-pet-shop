const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res)=>{
  console.log('server is running');
  //route GET
  if(req.url.slice(1) === 'pets'){
    fs.readFile('./pets.json', 'utf8', (err, data) => {
    let myData = JSON.stringify(data);
    while (myData.includes('\\')){
      myData = myData .replace('\\', '')
    }
    res.end(myData);
  });

  }

//   console.log(reqInfo, req.headers['user-agent']);
  //res.end(myData)
});

server.listen(8000);
