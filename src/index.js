"use strict";

const config = require( "./config" );
const server = require( "./server" );

const startServer = async () => {
    try {
        // create a instance of the server application
        const app = await server( config );

        // start the web server
        await app.start();
    } catch ( err ) {
        console.log( "startup error:", err ); // eslint-disable-line no-console
    }
};

startServer();
