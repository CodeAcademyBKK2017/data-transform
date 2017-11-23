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
const http = require('http');
const url = require('url');
const json = require('./assets/info.json');
const fs = require('fs');

const getFristName = (res) =>{
    res.write(json.data[0].name)
}

const sortArray = (a,b) =>{
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

const filterData = (need,data) => {
    //console.log(data,need)
    if(data.name === need){
        return data.dataFile;
    }
}

const sortAndGetName = (res) =>{
    let arrayOfJson =[]
    const data = json.data;

    for (let i in data) {
         arrayOfJson.push(data[i].name)  
    }
    arrayOfJson.sort(sortArray);

    res.write(arrayOfJson[0])
}

const getDataFromFile = (query,res) => {
   // console.log(query);
    const nameFile = json.data.filter(filterData.bind(this,query));
    res.write(fs.readFileSync(`./assets/data/${nameFile[0].dataFile}`,'utf8'))
}

const requestHandler = (req,res) =>{
    const parthQ = url.parse(req.url,true);
   // console.log(parthQ);
    switch (req.url) {
        case '/first-user/':
        if(req.method === 'GET'){
            getFristName(res);
        }
        else{
            res.write("GET ONLY!")
        }
            break;
        case '/first-user/?sort=false':
        if(req.method === 'GET'){
            getFristName(res);
        }
        else{
            res.write("GET ONLY!")
        }
            break;
        case '/first-user/?sort=true':
        if(req.method === 'GET'){
            sortAndGetName(res);
        }
        else{
            res.write("GET ONLY!")
        }
            break;
        case `/user-data/${parthQ.search}`:
        if(req.method === 'GET'){
            getDataFromFile(parthQ.query.user,res);
        }
        else{
            res.write("GET ONLY!")
        }
            break;
    }
    res.end();
}

http.createServer(requestHandler).listen(3008);
module.exports = requestHandler;
