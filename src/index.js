"use strict";

const config = require( "./config" );
const server = require( "./server" );

( async () => {
    try {
        const app = await server( config );
        await app.start();
    } catch ( err ) {
        console.log( "startup error:", err ); // eslint-disable-line no-console
    }
} )();
