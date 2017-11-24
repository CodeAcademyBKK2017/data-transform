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

const getFirstData = (sort) => {
    if (typeof sort === 'undefined') {
        return info.data[0].name;
    }
    else {
        if (sort === 'true') {
            const newInfoData = Array.from(info.data);
            newInfoData.sort((a, b) => {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                else if (nameA > nameB) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            return newInfoData[0].name;
        }
        else {
            return info.data[0].name;
        }
    }
}

const getUserData = (user) => {
    if (typeof user === 'undefined') {
        return '';
    }
    else {
        const userInfo = info.data.find((eachUser) => eachUser.name === user);
        if (typeof userInfo !== 'undefined') {
            const dataFile = fs.readFileSync(`./assets/data/${userInfo.dataFile}`, 'utf8');
            return dataFile;
        }
        else {
            return '';
        }
    }
}

const router = (req, res) => {
    const reqUrlParse = url.parse(req.url, true);
    const reqPattern = `${req.method}:${reqUrlParse.pathname}`;
    switch (reqPattern) {
        case 'GET:/first-user':
            res.write(getFirstData(reqUrlParse.query.sort));
            break;
        case 'GET:/user-data':
            res.write(getUserData(reqUrlParse.query.user));
            break;
        default:
            res.write('');
    }
    res.end();
}

// http.createServer(router).listen(3008);

module.exports = router;