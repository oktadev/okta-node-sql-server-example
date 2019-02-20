"use strict";

const bell = require( "bell" );
const authCookie = require( "hapi-auth-cookie" );

const isSecure = process.env.NODE_ENV === "production";

module.exports.register = async server => {
    // register plugins
    const config = server.app.config;
    await server.register( [ authCookie, bell ] );

    // configure cookie authorization strategy
    server.auth.strategy( "session", "cookie", {
        password: config.cookiePwd,
        redirectTo: "/authorization-code/callback", // If there is no session, redirect here
        isSecure // Should be set to true (which is the default) in production
    } );

    // configure bell to use your Okta authorization server
    server.auth.strategy( "okta", "bell", {
        provider: "okta",
        config: { uri: config.okta.url },
        password: config.cookiePwd,
        isSecure,
        location: config.url,
        clientId: config.okta.clientId,
        clientSecret: config.okta.clientSecret
    } );
};
