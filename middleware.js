require('colors');
var redis = require("redis"),
    config = require(process.cwd() + '/config'),
    client = redis.createClient(config.redis.port, config.redis.host),
    verbose = require('./logger').onVerbose;

var middleware = {

    extend: function(obj) {
        Object.keys(obj).forEach(function(key) {
            verbose("Nimble: Registering Middleware:".grey, (key).grey);
            this[key] = obj[key];
        }.bind(middleware));
        return middleware;
    },

    onRequest: function(req, res, next) {
        next();
    },

    // Private, best not to edit this, instead use onAfterPost, onAfterGet, onAfterController, etc...
    onAfterResponse: function(req, res) {
        var type = req.method;
        middleware.onAfterController(req, res);
        if (middleware["onAfter" + type]) {
            middleware["onAfter" + type](req, res)
        }
    },

    // Gets The Session Object from Redis
    readSession: function(req, res, next) {
        var session = require('express-session');
        var RedisStore = require('connect-redis')(session);
        var store = new RedisStore(options);
        var redis = require('redis');
        var client = redis.createClient();
        var cookieparser = require('cookie-parser');
        var cookie = require('express/node_modules/cookie');
        var options = {
            host: config.redis.host,
            port: config.redis.port,
            prefix: config.redis.key,
            client: client
        };

        if (req.headers.cookie) {
            var cookieItem = cookie.parse(req.headers.cookie);
            if (cookieItem[config.cookie.name]) {
                var sessionId = cookieparser.signedCookie(cookieItem[config.cookie.name], config.secret);
                store.get(sessionId, function(err, session) {
                    if (err) {
                        callback(err, '');
                    } else {
                        if (!session) {
                            next();
                        } else {
                            req.session = session;
                            next();
                        }
                    }
                });
            } else {
                next();
            }
        } else {
            next();
        }
    },

    onAfterController: function() {},
    onAfterGET: function() {},
    onAfterPOST: function() {},
    onAfterPUT: function() {},
    onAfterDELETE: function() {}
};

module.exports = middleware;
