"use strict";

// import the data access layer
const dataClient = require( "../data" );

module.exports = {
    name: "sql",
    version: "1.0.0",
    register: async server => {
        // get the sql connection information
        const config = server.app.config.sql;

        // create an instance of the database client
        const client = await dataClient( server, config );

        // "expose" the client so it is available everywhere "server" is available
        server.expose( "client", client );
    }
};
