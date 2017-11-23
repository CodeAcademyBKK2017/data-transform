const http = require('http');
const router = require('./request-handler');

http.createServer(router).listen(3008);