"use strict";

const blipp = require( "blipp" );
const ejs = require( "ejs" );
const inert = require( "inert" );
const pino = require( "hapi-pino" );
const { join } = require( "path" );
const vision = require( "vision" );

const auth = require( "./auth" );
const sql = require( "./sql" );

const isDev = process.env.NODE_ENV !== "production";

module.exports.register = async server => {
    // register plugins
    await server.register( [ blipp, inert, {
        plugin: pino,
        options: {
            prettyPrint: isDev,
            logEvents: [ "response" ]
        }
    }, sql, vision ] );

    // configure ejs view templates
    const filePath = join( process.cwd(), "src" );
    server.views( {
        engines: { ejs },
        relativeTo: filePath,
        path: "views",
        layout: true
    } );

    await auth.register( server );
};
