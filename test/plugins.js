"use strict";

const { expect } = require( "code" );
const Lab = require( "lab" );
const hapi = require( "hapi" );
const sql = require( "../src/plugins/sql" );
const plugins = require( "../src/plugins" );

const lab = exports.lab = Lab.script();
const { describe, it } = lab;

describe( "Plugins", () => {
    it( "registers sql plugin and exposes client", async () => {
        const server = hapi.server();
        server.app.config = { sql: {} };
        await server.register( sql );
        expect( server.plugins.sql ).to.exist();
        expect( server.plugins.sql.client ).to.exist();
    } );

    it( "registers plugins", async () => {
        const server = hapi.server();
        server.app.config = {
            cookiePwd: "superCoolAndAwesomeCookiePasswordYouCanNeverGuess",
            okta: {
                url: "https://dev-1234.oktapreview.com",
                clientId: "1234567890",
                clientSecret: "adfasbasdfasvbasdfasvgadfbasdf"
            },
            sql: {}
        };
        await plugins.register( server );
        expect( server.plugins.blipp ).to.exist();
        expect( server.plugins.sql ).to.exist();
        expect( server.plugins.sql.client ).to.exist();
    } );
} );
