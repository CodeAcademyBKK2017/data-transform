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
const moduler = require('./moduler');

const requestHandler = (req,res) =>{
    const parthQ = url.parse(req.url,true);
    const URL = `${req.method}:${parthQ.pathname}`;
    switch (URL) {
        case 'GET:/first-user/':
        res.write(moduler.getFristName(res,parthQ.query));
            break;
        case `GET:/user-data/`:
        res.write(moduler.getDataFromFile(parthQ.query.user,res));
            break;
        default: 
            res.write("GET ONLY!") 
        break;
    }
    res.end();
}

http.createServer(requestHandler).listen(3008);
module.exports = requestHandler;
