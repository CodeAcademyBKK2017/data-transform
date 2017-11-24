const url = require('url');
const fs = require('fs');
const info = require('./assets/info.json');

const router = (req, res) => {
    const urlParsed = url.parse(req.url, true);
    const requestPath = `${req.method}:${urlParsed.pathname}`;
    
    let output = '';

    switch (requestPath) {
        case 'GET:/first-user': {
            output = firstUserRequestHandler(req, res, urlParsed);
            break;
        }
        case 'GET:/user-data': {
            output = getUserDataRequestHandler(req, res, urlParsed);
            break; 
        }
        default: {
            output = 'URL not found.';
            break;
        }
    }

    res.write(output);  
    res.end();
}

const firstUserRequestHandler = (req, res, urlParsed) => {
    let sortedUsers = [...info.data];

    if (urlParsed.query.sort === 'true') {
        sortedUsers.sort((userA, userB) => userB.name < userA.name);
    }
        
    return sortedUsers[0].name;sdf
}

const getUserDataRequestHandler = (req, res, urlParsed) => {
    const userData = info.data.find(user => user.name.toLowerCase() === urlParsed.query.user.toLowerCase());

    if (userData) {
        return fs.readFileSync(`./assets/data/${userData.dataFile}`, 'utf8');
    }
    
    return 'User not found.';
}

module.exports = router;