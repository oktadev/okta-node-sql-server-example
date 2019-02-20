"use strict";

const boom = require( "boom" );

module.exports.register = async server => {
    server.route( {
        method: "GET",
        path: "/api/events",
        config: {
            auth: {
                strategy: "session",
                mode: "required"
            }
        },
        handler: async request => {
            try {
                const db = request.server.plugins.sql.client;
                const userId = "01234";
                const events = await db.events.getEvents( userId );
                return events.recordset;
            } catch ( err ) {
                server.log( [ "error", "api", "events" ], err );
                return boom.boomify( err );
            }
        }
    } );
};
