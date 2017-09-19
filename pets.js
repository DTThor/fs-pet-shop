if (process.argv.length === 2) {
  console.log("Usage: node pets.js [read | create | update | destroy]");
} else {
  const fs = require('fs');
  //will need to read file everytime in order to use it.
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    //need to parse the json file in order to use it.
    let myData = JSON.parse(data);
    //logic to determine which task to perform, read or create.
    if (process.argv[2] == 'read') {
      if (process.argv.length == 3) {
        console.log(myData);
      } else if (process.argv.length == 4 && process.argv[3] < myData.length && process.argv[3] >= 0) {
        console.log(myData[process.argv[3]]);
      } else {
        console.log('Usage: node pets.js read INDEX');
      }
    }
    if (process.argv[2] === 'create') {
      if (process.argv.length !== 6) {
        console.log('Usage: node pets.js create AGE KIND NAME');
      } else {
        if (!Number.isInteger(parseInt(process.argv[3]))) {
          console.log('Age must be a number!');
        } else {
          myData.push({
            age: parseInt(process.argv[3]),
            kind: process.argv[4],
            name: process.argv[5]
          });
          let newData = JSON.stringify(myData);
          fs.writeFile('./pets.json', newData, (err) => {});
        }
      }
    }
    if (process.argv[2] === 'update') {
      if (process.argv.length !== 7) {
        console.log('Usage: node pets.js update INDEX AGE KIND NAME');
      }else{
        if (!Number.isInteger(parseInt(process.argv[4]))){
          console.log('Age must be a number!');
        }else{
          myData[process.argv[3]].age = parseInt(process.argv[4]);
          myData[process.argv[3]].kind = process.argv[5];
          myData[process.argv[3]].name = process.argv[6];
          let newData = JSON.stringify(myData);
          fs.writeFile('./pets.json', newData, (err) => {});
        }
      }
    }
    if (process.argv[2] === 'destroy') {
      if (process.argv.length !== 4) {
        console.log('Usage: node pets.js destroy INDEX');
      }else{
        console.log(myData[process.argv[3]]);
        myData.splice(process.argv[3], 1);
        let newData = JSON.stringify(myData);
        fs.writeFile('./pets.json', newData, (err) => {});
      }
    }
  });
}
