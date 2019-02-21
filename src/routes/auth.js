"use strict";

const boom = require( "boom" );

module.exports.register = async server => {
    // login route
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

    // OIDC callback
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

    // Logout
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
};
