var Hapi = require("hapi");
var joi = require("joi");
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8001
});
server.route({
    path: "/",
    method: "GET",
    handler: function(request, reply) {
        reply("Hello, IG Guys!");
    }
});
server.start(function () {
    console.log("Hapi server started @", server.info.uri);
});