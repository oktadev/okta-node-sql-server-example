"use strict";

const api = require( "./api" );
const auth = require( "./auth" );

module.exports.register = async server => {
    // register api routes
    await api.register( server );

    // register authentication routes
    await auth.register( server );

    // home page route
    server.route( {
        method: "GET",
        path: "/",
        config: {
            auth: {
                strategy: "session",
                mode: "optional"
            }
        },
        handler: async ( request, h ) => {
            try {
                const message = request.auth.isAuthenticated ? `Hello, ${ request.auth.credentials.profile.firstName }!` : "My first hapi server!";
                return h.view( "index", {
                    title: "Home",
                    message,
                    isAuthenticated: request.auth.isAuthenticated
                } );
            } catch ( err ) {
                server.log( [ "error", "home" ], err );
            }
        }
    } );

    // Serve static files in the /dist folder
    server.route( {
        method: "GET",
        path: "/{param*}",
        handler: {
            directory: {
                path: "dist"
            }
        }
    } );
};
