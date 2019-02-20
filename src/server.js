"use strict";

const Hapi = require( "hapi" );
const plugins = require( "./plugins" );
const routes = require( "./routes" );

module.exports = async config => {
    const { host, port } = config;
    const server = Hapi.server( { host, port } );
    server.app.config = config;

    // register plugins
    await plugins.register( server );

    // register routes
    await routes.register( server );

    return server;
};

