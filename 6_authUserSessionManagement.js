var Hapi = require('hapi');

var users = {
    vibhor: {
        id: 'vibhor',
        password: 'igdefault',
        name: 'Vibhor, One man Army'
    }
};

var home = function (request, reply) {

    reply('<html><head><title>Login page</title></head><body><h3>Welcome '
    + request.auth.credentials.name
    + '!</h3><br/><form method="get" action="/logout">'
    + '<input type="submit" value="Logout">'
    + '</form></body></html>');
};

var login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    var message = '';
    var account = null;

    if (request.method === 'post') {

        if (!request.payload.username || !request.payload.password) {

            message = 'Missing username or password';
        }
        else {
            account = users[request.payload.username];
            if (!account ||
                account.password != request.payload.password) {

                message = 'Invalid username or password';
            }
        }
    }

    if (request.method === 'get' ||
        message) {

        return reply('<html><head><title>Login page</title></head><body>'
        + (message ? '<h3>' + message + '</h3><br/>' : '')
        + '<form method="post" action="/login">'
        + 'Username: <input type="text" name="username"><br>'
        + 'Password: <input type="password" name="password"><br/>'
        + '<input type="submit" value="Login"></form></body></html>');
    }

    request.auth.session.set(account);
    return reply.redirect('/');
};

var logout = function (request, reply) {

    request.auth.session.clear();
    return reply.redirect('/');
};

var server = new Hapi.Server();
server.connection({port: 8001});

//Swagger
server.register({
    register: require('hapi-swagger'),
    options: {
        apiVersion: "0.6.0"
    }
}, function (err) {
    if (err) {
        console.log('Error:' + err);
    } else {
        console.log('Swagger Plugin Enabled');
    }
});

server.register(require('hapi-auth-cookie'), function (err) {

    server.auth.strategy('session', 'cookie', {
        password: 'secret',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: false
    });
});

server.route([
    {
        path: '/',
        method: 'GET',
        config: {
            handler: home,
            auth: 'session'
        }
    },
    {
        path: '/login',
        method: ['GET', 'POST'],
        config: {
            handler: login,
            tags: ['api'],
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            }
        }
    },
    {
        path: '/logout',
        method: 'GET',
        config: {
            handler: logout,
            auth: 'session'
        }
    }
]);

server.start(function () {
    console.log("Hapi server started @", server.info.uri);
});