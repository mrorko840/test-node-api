const handler = {};

handler.sampleHandler = (reqProps, callback) => {
    callback(200, {
        msg: "this is sample page"
    });
    
};

module.exports = handler;