let server = {};

server.config = {
    port: '4000',
    hostName: '127.0.0.1'
};

server.dbConfig = {
    dbPort: 'mongodb://localhost:27017/mm_database'
}

module.exports = server;