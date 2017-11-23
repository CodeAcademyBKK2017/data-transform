/*
# DATA EXERCISE

## Exercise 1: Read a JSON file

1.success test case
2. function
3. fail test case

GET localhost:3008/first-user/
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

const requestHandler = (req, res) => {
    const requestData = url.parse(req.url, true);
    if (requestData.pathname === '/first-user') {
        if (typeof requestData.query.sort === 'undefined') {
            res.write(info.data[0].name);
            res.end();
        }
        else {
            if (requestData.query.sort === 'true') {
                // const newInfoData = info.data.slice();
                const newInfoData = Array.from(info.data);
                newInfoData.sort((a, b) => {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                // console.log(info.data[0].name);
                res.write(newInfoData[0].name);
                res.end();
            }
            else {
                res.write(info.data[0].name);
                res.end();
            }
        }
    }
    else if (requestData.pathname === '/user-data') {
        if (typeof requestData.query.user === 'undefined') {
            res.write('');
            res.end();
        }
        else {
            const user = info.data.find((eachUser)=> eachUser.name === requestData.query.user);
            if (typeof user !== 'undefined') {
                const dataFile = fs.readFileSync(`./assets/data/${user.dataFile}`, 'utf8');
                res.write(dataFile);
                res.end();
            }
            else {
                res.write('');
                res.end();
            }
        }
    }
    else {
        res.write('');
        res.end();
    }
}

// http.createServer(requestHandler).listen(3008);

module.exports = requestHandler;