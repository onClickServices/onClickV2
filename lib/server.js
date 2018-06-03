let server = {};

server.config = {
    port: '3000',
    hostName: '127.0.0.1'
};

server.dbConfig = {
    dbHost: 'mongodb://onclick:Clickadmin2018@ds245150.mlab.com:45150/',
    dbName: 'onclick',
    secret: 'CBAB340E4E'
};

module.exports = server;