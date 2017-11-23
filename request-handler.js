const url = require('url');
const fs = require('fs');
const info = require('./assets/info.json');

const requestHandler = (req, res) => {
    const urlParsed = url.parse(req.url, true);

    if (req.method === 'GET') {
        switch (urlParsed.pathname) {
            case '/first-user': firstUserRequestHandler(req, res, urlParsed); break;
            case '/user-data': getUserDataRequestHandler(req, res, urlParsed); break;
            default:
                res.write('URL not found.');
                res.end();
                break;
        }
    } else if(req.method === 'POST') {
        res.write('URL not found.');
        res.end();
    }
}

const firstUserRequestHandler = (req, res, urlParsed) => {
    let sortedUsers = [...info.data];

    if (urlParsed.query.sort === 'true')
        sortedUsers.sort((userA, userB) => userB.name < userA.name);

    res.write(sortedUsers[0].name);
    res.end();
}

const getUserDataRequestHandler = (req, res, urlParsed) => {
    const userData = info.data.find(user => user.name.toLowerCase() === urlParsed.query.user.toLowerCase());

    if (userData) {
        const fileName = `assets/data/${userData.dataFile}`;
        res.write(fs.readFileSync(fileName, 'utf8'));
        res.end();

        return;
    }

    res.write('User not found.');
    res.end();
}

module.exports = requestHandler;