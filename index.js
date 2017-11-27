// import { Promise } from 'core-js/library/web/timers';

/*
# DATA EXERCISE

## Exercise 1: Read a JSON file

GET /first-user/
> This will read info.json file and return the name of the first user in the data array.

Expected Response

"Teresa"

## Exercise 2: Sort the array

GET /first-user/?sort=true
> If sort=true, the API will sort the array and return the first name of the sorted data.
> if sort=false, the API will return the first name of the array.

Expected Response

"John"


> __Note:__ Use `POSTMAN` for testing the APIs and `nodemon` for fast development
*/
const url = require('url');
const fs = require('fs');
const info = require('./assets/info.json');

const readFilePromiss = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err){
        reject(err);
      }
      resolve(data);
    });
  });
};

const dataTransform = (req, res) => {
  const requestData = url.parse(req.url, true);
  if(req.method == 'GET'){
    if(requestData.pathname == '/first-user'){
            
      //console.log(info.data[0].name);
      //console.log(requestData.query.sort);
      if(requestData.query.sort === 'true'){
        let sortedUsers = [...info.data];
        sortedUsers.sort((a,b) => a.name > b.name);

        res.write(sortedUsers[0].name);
        res.end();
      }else if(requestData.query.sort === 'false'){
        res.write(info.data[0].name);
        res.end();
      }else{
        res.write(info.data[0].name);
        res.end();
      }
            
    }else if(requestData.pathname == '/user-data'){
      if(requestData.query.user){
        const userCheck =  requestData.query.user;
        let filterUser = info.data.filter((user)=>{
          return userCheck.toLowerCase() === user.name.toLowerCase();
        });
        const fileName = filterUser[0].dataFile;
        // console.log(filterUser[0].dataFile);

      return readFilePromiss(`./assets/data/${fileName}`).then((data) => {
        res.write(data);
        res.end();
      });

        // // fs.readFile(`./assets/data/${fileName}`, 'utf8', (err, data) => {
        // //   res.write(data);
        // // });
        // //const dataUser = fs.readFileSync(`./assets/data/${fileName}`, 'utf8');
        // //console.log(dataUser);
        // res.write(dataUser);
      }else{
        res.write('error');
        res.end();
        
      }
    }else {
      res.write('error');
      res.end();
      
    }
  }else{
    res.write('GET Only');
    res.end();
    
  }

};

module.exports = dataTransform;