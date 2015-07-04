var Hapi = require("hapi");
var Joi = require("joi");
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8001
});
server.route({
    path: "/api/{firstName}/{lastName}/{age}",
    method: "GET",
    config: {
        validate: {
            params: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                age: Joi.number().required()
            }
        }
    },
    handler: function (request, reply) {
        console.log('You can see your all data ', request.params);
        reply("Hello, IG Guys! Do you know " + request.params.firstName + ' ' + request.params.lastName);
    }
});
server.start(function () {
    console.log("Hapi server started @", server.info.uri);
});