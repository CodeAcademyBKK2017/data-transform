const http = require('http');
const url = require('url');
const jsonData = require('./assets/info.json');


//refactoring
// array = ['teresa', 'john']

const sortUsers = (data) => {
    return data.sort((user,nextUser) => {
        if(user.name > nextUser.name) return 1;
        else return -1;
    })
}

const requestHandle = (req,res) => {
    const parth = url.parse(req.url,true);
    console.log(parth);
    if (req.url === '/first-user/'){
        res.write(jsonData.data[0].name);
    } else if (req.url === '/first-user/?sort=true'){
        let arraySort = sortUsers(jsonData.data);
        res.write(arraySort[0].name);
    }  else if (req.url === '/first-user/?sort=false'){
        res.write(jsonData.data[0].name);
    }  else if (req.url === `/user-data/?user=${parth.query.user}`){
        res.write();
    } else {
        res.write("...");
    }
    res.end();
} 

http.createServer(requestHandle).listen(3008);

module.exports = requestHandle;
