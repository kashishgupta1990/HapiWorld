var Hapi = require("hapi");
var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8001
});

var swaggerOptions = {
    apiVersion: "0.6.0"
};

server.register({
    register: require('hapi-swagger'),
    options: swaggerOptions
}, function (err) {
    if (err) {
        console.log('Error:' + err);
    } else {
        console.log('Swagger Plugin Enabled');
    }
});

server.route({
    path: "/",
    method: "GET",
    handler: function (request, reply) {
        reply("Welcome to Hapi Family");
    }
});

//Get Request
server.route({
    path: "/api/user",
    method: "GET",
    config: {
        tags:['api'],
        handler: function (request, reply) {
            reply("I am getting user data");
        }
    }
});

//POST
server.route({
    path: "/api/user",
    method: "POST",
    config:{
        description: 'Save User',
        tags: ['api'],
        notes: ['Use this API to Save User'],
        handler: function (request, reply) {
            reply("I am save POST request");
        }
    }
});

server.start(function () {
    console.log("Hapi server started @", server.info.uri);
});