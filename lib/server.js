let server = {};

server.config = {
    port: '3000',
    hostName: '127.0.0.1'
};

server.dbConfig = {
    dbHost: 'mongodb://localhost:27017/',
    dbName: 'oc_database',
    secret: 'CBAB340E4E'
};

module.exports = server;