const http = require('http');
const index = require('./index');

http.createServer(index).listen(3008);
