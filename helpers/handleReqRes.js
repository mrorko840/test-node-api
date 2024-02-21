const url =  require('url');
const {StringDecoder} =  require('string_decoder');

const routes = require('../routes');
// console.log(Object.keys(routes)); // ['home', 'about']
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

const handler = {};

handler.handleReqRes = (req, res) => {
    // request handle
    // parse the requested url
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname; //ex: /about/index
    const trimPath = path.replace(/^\/+|\/+$/g, ''); // remove leading & trailing slashes
    const method = req.method.toLowerCase();
    const query = parsedUrl.query;
    const headers = req.headers;

    const requestProps  = {parsedUrl, path, trimPath , method, query, headers};

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    

    const chosenHandler = routes[trimPath] ? routes[trimPath] : notFoundHandler;

    chosenHandler(requestProps , (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload)==='object' && !Array.isArray(payload)? payload : {};

        const payloadString = JSON.stringify(payload);

        // res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.writeHead(statusCode);
        res.end(payloadString);

    })

    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })
    req.on('end', () => {
        realData += decoder.end()


        // console.log(realData);
        
        // const jsonData = {
        //     "method": method,
        //     "path": trimPath
        // };
        // response handle
        // res.end(JSON.stringify(jsonData));
    })

}

module.exports = handler;