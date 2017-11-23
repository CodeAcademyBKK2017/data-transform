const http = require('http');
const requestHandler = require('./index');

http.createServer(requestHandler).listen(3008);