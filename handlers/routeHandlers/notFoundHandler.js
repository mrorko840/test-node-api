const handler = {};

handler.notFoundHandler = (reqProps, callback) => {
    callback(404, {
        msg: "Page Not Found",
    });
    
};

module.exports = handler;