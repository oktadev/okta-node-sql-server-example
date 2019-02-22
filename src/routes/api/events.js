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
            },
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;

                    // get the current authenticated user's id
                    const userId = request.auth.credentials.profile.id;

                    // execute the query
                    const res = await db.events.getEvents( userId );

                    // return the recordset object
                    return res.recordset;
                } catch ( err ) {
                    server.log( [ "error", "api", "events" ], err );
                    return boom.boomify( err );
                }
            }
        }
    } );

    server.route( {
        method: "POST",
        path: "/api/events",
        config: {
            auth: {
                strategy: "session",
                mode: "required"
            },
            handler: async request => {
                try {
                    const db = request.server.plugins.sql.client;
                    const userId = request.auth.credentials.profile.id;
                    const { startDate, startTime, endDate, endTime, title, description } = request.payload;
                    const res = await db.events.addEvent( { userId, startDate, startTime, endDate, endTime, title, description } );
                    return res.recordset[ 0 ];
                } catch ( err ) {
                    server.log( [ "error", "api", "events" ], err );
                    return boom.boomify( err );
                }
            }
        }
    } );

    server.route( {
        method: "DELETE",
        path: "/api/events/{id}",
        config: {
            auth: {
                strategy: "session",
                mode: "required"
            },
            response: {
                emptyStatusCode: 204
            },
            handler: async request => {
                try {
                    const id = request.params.id;
                    const userId = request.auth.credentials.profile.id;
                    const db = request.server.plugins.sql.client;
                    const res = await db.events.deleteEvent( { id, userId } );
                    return res.rowsAffected[ 0 ] === 1 ? "" : boom.notFound();
                } catch ( err ) {
                    server.log( [ "error", "api", "events" ], err );
                    return boom.boomify( err );
                }
            }
        }
    } );
};
