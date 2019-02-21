"use strict";

const { expect } = require( "code" );
const Lab = require( "lab" );
const td = require( "testdouble" );

const lab = exports.lab = Lab.script();
const { describe, it, beforeEach, afterEach } = lab;

describe( "Config", () => {
    const setAllEnv = () => {
        process.env.PORT = "3000";
        process.env.HOST = "hostname";
        process.env.HOST_URL = "http://hostname:3000";
        process.env.COOKIE_ENCRYPT_PWD = "superLongAndAwesomePasswordAtLeast32Chars";
        process.env.SQL_SERVER = "dbserver";
        process.env.SQL_DATABASE = "dbname";
        process.env.SQL_USER = "dbuser";
        process.env.SQL_PASSWORD = "dbpassword";
        process.env.OKTA_ORG_URL = "https://dev-12345.oktapreview.com";
        process.env.OKTA_CLIENT_ID = "1234456789";
        process.env.OKTA_CLIENT_SECRET = "asdfljsdfglasdfljasdfl;lsdf;;jfjasdf";
    };

    beforeEach( () => {
        td.replace( "dotenv" );
    } );

    afterEach( () => {
        delete process.env.PORT;
        delete process.env.HOST;
        delete process.env.HOST_URL;
        delete process.env.COOKIE_ENCRYPT_PWD;
        delete process.env.SQL_SERVER;
        delete process.env.SQL_DATABASE;
        delete process.env.SQL_USER;
        delete process.env.SQL_PASSWORD;
        delete process.env.SQL_ENCRYPT;
        delete process.env.OKTA_ORG_URL;
        delete process.env.OKTA_CLIENT_ID;
        delete process.env.OKTA_CLIENT_SECRET;
        td.reset();
    } );

    it( "returns the config", async () => {
        setAllEnv();
        const config = require( "../src/config" );
        expect( config.port ).to.equal( "3000" );
        expect( config.host ).to.equal( "hostname" );
        expect( config.sql ).to.exist();
        expect( config.sql.server ).to.equal( "dbserver" );
        expect( config.sql.database ).to.equal( "dbname" );
        expect( config.sql.user ).to.equal( "dbuser" );
        expect( config.sql.password ).to.equal( "dbpassword" );
        expect( config.sql.options ).to.exist();
        expect( config.sql.options.encrypt ).to.equal( false );
    } );

    it( "parses SQL_ENCRYPT", async () => {
        setAllEnv();
        process.env.SQL_ENCRYPT = "true";
        const config = require( "../src/config" );
        expect( config.sql ).to.exist();
        expect( config.sql.options ).to.exist();
        expect( config.sql.options.encrypt ).to.equal( true );
    } );

    it( "errors when host is not present", async () => {
        setAllEnv();
        delete process.env.HOST;
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "HOST" );
        }
    } );

    it( "errors when port is not present", async () => {
        setAllEnv();
        delete process.env.PORT;
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "PORT" );
        }
    } );

    it( "errors when sql server is not present", async () => {
        setAllEnv();
        delete process.env.SQL_SERVER;
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "SQL_SERVER" );
        }
    } );

    it( "errors when sql database is not present", async () => {
        setAllEnv();
        delete process.env.SQL_DATABASE;
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "SQL_DATABASE" );
        }
    } );

    it( "errors when sql user is not present", async () => {
        setAllEnv();
        delete process.env.SQL_USER;
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "SQL_USER" );
        }
    } );

    it( "errors when sql password is not present", async () => {
        setAllEnv();
        delete process.env.SQL_PASSWORD;
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "SQL_PASSWORD" );
        }
    } );
} );
