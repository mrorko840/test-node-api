const handler = {};

handler.aboutHandler = (reqProps, callback) => {
    callback(200, {
        msg: "this is about page"
    });
    
};

module.exports = handler;