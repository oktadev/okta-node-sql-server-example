"use strict";

const boom = require( "boom" );
const api = require( "./api" );

module.exports.register = async server => {
    // server.route( {
    //     method: "GET",
    //     path: "/",
    //     handler: async ( request, h ) => {
    //         try {
    //             const message = "My first hapi server!";
    //             return h.view( "index", {
    //                 title: "Home",
    //                 message
    //             } );
    //         } catch ( err ) {
    //             server.log( [ "error", "home" ], err );
    //         }
    //     }
    // } );
    await api.register( server );
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

    server.route( {
        method: "GET",
        path: "/login",
        options: {
            auth: "session",
            handler: async request => {
                return `Hello, ${ request.auth.credentials.profile.email }!`;
            }
        }
    } );

    server.route( {
        method: "GET",
        path: "/authorization-code/callback",
        options: {
            auth: "okta",
            handler: ( request, h ) => {
                if ( !request.auth.isAuthenticated ) {
                    throw boom.unauthorized( `Authentication failed: ${ request.auth.error.message }` );
                }
                request.cookieAuth.set( request.auth.credentials );
                return h.redirect( "/" );
            }
        }
    } );

    server.route( {
        method: "GET",
        path: "/logout",
        options: {
            auth: {
                strategy: "session",
                mode: "try"
            },
            handler: ( request, h ) => {
                try {
                    if ( request.auth.isAuthenticated ) {
                        // const idToken = encodeURI( request.auth.credentials.token );

                        // clear the local session
                        request.cookieAuth.clear();
                        // redirect to the Okta logout to completely clear the session
                        // const oktaLogout = `${ process.env.OKTA_ORG_URL }/oauth2/default/v1/logout?id_token_hint=${ idToken }&post_logout_redirect_uri=${ process.env.HOST_URL }`;
                        // return h.redirect( oktaLogout );
                    }

                    return h.redirect( "/" );
                } catch ( err ) {
                    request.log( [ "error", "logout" ], err );
                }
            }
        }
    } );

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
