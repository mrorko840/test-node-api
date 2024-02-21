// dependensics
const http =  require('http');
require('dotenv').config()
const {handleReqRes} = require('./helpers/handleReqRes')

// app object
const app = {};

// config
app.config = {
    port: process.env.PORT,
};


// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=>{
        console.log(`server is running on ${app.config.port}`);
    });
}

// handle request and response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
