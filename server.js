const http = require('http');
const requestHandler = require('./request-handler');

http.createServer(requestHandler).listen(3008);