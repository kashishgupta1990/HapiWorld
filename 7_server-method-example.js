var Hapi = require("hapi");
var server = new Hapi.Server();
var Joi = require("joi");

server.connection({
    host: 'localhost',
    port: 8001
});

//Server Method
var add = function (x, y, next) {
    // note that the 'next' callback must be used to return values
    next(null, x + y);
};

//Normal by default
server.method('add', add, {});

//Enabling caching on Hapi level
/*server.method('add', add, {
    cache: {
        expiresIn: 60000
    }
});*/

server.route({
    path: "/add/{num1}/{num2}",
    method: "GET",
    config: {
        validate: {
            params: {
                num1: Joi.number(),
                num2: Joi.number()
            }
        },
        handler: function (request, reply) {
            server.methods.add(+request.params.num1, +request.params.num2, function (err, result) {
                reply("Result is " + result);
            });
        }
    }
});

server.start(function () {
    console.log("Hapi server started @", server.info.uri);
});