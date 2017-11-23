const http = require('http');
const sv = require('./requestHandler');
http.createServer(sv.requestHandler).listen(3008);
