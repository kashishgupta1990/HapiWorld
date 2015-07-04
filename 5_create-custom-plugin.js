var Hapi = require("hapi");

var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8001
});

//Creating Custom Plugin
var myBabuPlugin = {
    register: function (server, options, next) {
        console.log('I am Babu plugin');
        server.route({
            path: "/babu/api",
            method: "GET",
            handler: function(request, reply) {
                reply("Hello, Babu kassa hai ?");
            }
        });
        next();
    }
};
//Give name to your plugin
myBabuPlugin.register.attributes = {
    name: 'myBabuPlugin',
    version: '1.0.0'
};
//Loading your plugin / Register your plugin
server.register({register: myBabuPlugin}, function (err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }
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