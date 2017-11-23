const url = require('url');
const fs = require('fs');
const infoJson = require('./assets/info.json');

//--------------------------------------------------

const PAGE_NOT_FOUND = 'Page not found.';
const WRONG_METHOD = 'WRONG METHOD';
const USER_NOT_FOUND = 'USER NOT FOUND';

//--------------------------------------------------

const requestHandler = (req, res) => {
    const method = req.method;
    const parsed = url.parse(req.url, true);
    const query = parsed.query;
    
    // console.log('>>>>>START');

    // console.log('parsed:', parsed);
    // console.log('pathname:', parsed.pathname);
    // console.log('query:', query);
    // console.log('method:', method);

    switch (parsed.pathname) {
        
        case '/first-user':
            if(method === 'GET') {
                const isSort = (query.sort === 'true');
                const firstUser = getFirstUserObject(isSort);
                res.write(firstUser.name);
                res.end();
            }
            else {
                res.write(WRONG_METHOD);
                res.end();
            }
            break;

        case '/user-data':
            if(method === 'GET') {
                const userFileName = `${query.user}.txt`.toLowerCase();
                const userFilePath = `./assets/data/${userFileName}`;
                fs.readFile(userFilePath, 'utf8', (err, data) => {
                    if (err) {
                        // throw err;

                        res.write(USER_NOT_FOUND);
                        res.end();
                    }
                    else {
                        res.write(data);
                        res.end();
                    }
                });
            }
            else {
                res.write(WRONG_METHOD);
                res.end();
            }
            break;
        
        default:
            res.write(PAGE_NOT_FOUND);
            res.end();
            break;
    }
    // console.log('<<<<<END');
}

const getFirstUserObject = (isSortAsc) => {
    const originalUserArray = infoJson.data;
    const tempUserArray = [...originalUserArray];

    if(isSortAsc) {
        tempUserArray.sort((obj1, obj2) => {
            return obj1.name > obj2.name;
        });
    }
    
    return tempUserArray[0];
}

const getUserWithName = (name) => {
    // const originalUserArray = infoJson.data;
    // const tempUserArray = [...originalUserArray];

    // if(isSortAsc) {
    //     tempUserArray.sort((obj1, obj2) => {
    //         return obj1.name > obj2.name;
    //     });
    // }
    
    // return tempUserArray[0];
}

module.exports = {
    requestHandler,
    PAGE_NOT_FOUND,
    WRONG_METHOD,
    USER_NOT_FOUND
};