var Hapi = require("hapi");
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8001
});
server.start(function () {
    console.log("Hapi server started @", server.info.uri);
});