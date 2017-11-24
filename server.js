const http = require('http');
const sv = require('./router');
http.createServer(sv.router).listen(3008);

// const x = '2';
// console.log('Test');
const g = {test : 1};
const x = [1,2,3];
x.sort((a,b) => {a-b;});

