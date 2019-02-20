"use strict";

const { expect } = require( "code" );
const Lab = require( "lab" );
const td = require( "testdouble" );

const lab = exports.lab = Lab.script();
const { describe, it, beforeEach, afterEach } = lab;

describe( "Config", () => {
    beforeEach( () => {
        td.replace( "dotenv" );
    } );

    afterEach( () => {
        delete process.env.PORT;
        delete process.env.HOST;
        delete process.env.SQL_SERVER;
        delete process.env.SQL_DATABASE;
        delete process.env.SQL_USER;
        delete process.env.SQL_PASSWORD;
        delete process.env.SQL_ENCRYPT;
        td.reset();
    } );

    it( "returns the config", async () => {
        process.env.PORT = "3000";
        process.env.HOST = "hostname";
        process.env.SQL_SERVER = "dbserver";
        process.env.SQL_DATABASE = "dbname";
        process.env.SQL_USER = "dbuser";
        process.env.SQL_PASSWORD = "dbpassword";
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
        process.env.PORT = "3000";
        process.env.HOST = "hostname";
        process.env.SQL_SERVER = "dbserver";
        process.env.SQL_DATABASE = "dbname";
        process.env.SQL_USER = "dbuser";
        process.env.SQL_PASSWORD = "dbpassword";
        process.env.SQL_ENCRYPT = "true";
        const config = require( "../src/config" );
        expect( config.sql ).to.exist();
        expect( config.sql.options ).to.exist();
        expect( config.sql.options.encrypt ).to.equal( true );
    } );

    it( "errors when host is not present", async () => {
        process.env.PORT = "3000";
        process.env.SQL_SERVER = "dbserver";
        process.env.SQL_DATABASE = "dbname";
        process.env.SQL_USER = "dbuser";
        process.env.SQL_PASSWORD = "dbpassword";
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "HOST" );
        }
    } );

    it( "errors when port is not present", async () => {
        process.env.HOST = "hostname";
        process.env.SQL_SERVER = "dbserver";
        process.env.SQL_DATABASE = "dbname";
        process.env.SQL_USER = "dbuser";
        process.env.SQL_PASSWORD = "dbpassword";
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "PORT" );
        }
    } );

    it( "errors when sql server is not present", async () => {
        process.env.HOST = "hostname";
        process.env.PORT = "3000";
        process.env.SQL_DATABASE = "dbname";
        process.env.SQL_USER = "dbuser";
        process.env.SQL_PASSWORD = "dbpassword";
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "SQL_SERVER" );
        }
    } );

    it( "errors when sql database is not present", async () => {
        process.env.HOST = "hostname";
        process.env.PORT = "3000";
        process.env.SQL_SERVER = "dbserver";
        process.env.SQL_USER = "dbuser";
        process.env.SQL_PASSWORD = "dbpassword";
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "SQL_DATABASE" );
        }
    } );

    it( "errors when sql user is not present", async () => {
        process.env.HOST = "hostname";
        process.env.PORT = "3000";
        process.env.SQL_SERVER = "dbserver";
        process.env.SQL_DATABASE = "dbname";
        process.env.SQL_PASSWORD = "dbpassword";
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "SQL_USER" );
        }
    } );

    it( "errors when sql password is not present", async () => {
        process.env.HOST = "hostname";
        process.env.PORT = "3000";
        process.env.SQL_SERVER = "dbserver";
        process.env.SQL_DATABASE = "dbname";
        process.env.SQL_USER = "dbuser";
        try {
            const config = require( "../src/config" );
            expect( config ).to.not.exist();
        } catch ( err ) {
            expect( err ).to.exist();
            expect( err.message ).to.contain( "SQL_PASSWORD" );
        }
    } );
} );
