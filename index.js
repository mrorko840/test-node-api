// dependensics
const http =  require('http');
const {handleReqRes} = require('./helpers/handleReqRes')

// app object
const app = {};

// config
app.config = {
    port: process.env.PORT || 8080,
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
