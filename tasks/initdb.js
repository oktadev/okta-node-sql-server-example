"use strict";

const config = require( "../src/config" );
const fse = require( "fs-extra" );
const path = require( "path" );
const sql = require( "mssql" );

const init = async () => {
    try {
        // read the sql file
        const sqlFile = path.join( process.cwd(), "tasks", "initdb.sql" );
        let initsql = await fse.readFile( sqlFile, { encoding: "UTF-8" } );

        // remove comments
        initsql = initsql.replace( /-{2}.*/g, "" );
        initsql = initsql.replace( /\/\*([\s\S]*?)\*\//g, "" );

        // remove blank lines
        initsql = initsql.replace( /^\s*$(?:\r\n?|\n)/gm, "" );

        // split into individual statements
        const statements = initsql.split( /(?:;|GO)\s*$/mi );

        // connect to SQL Server
        await sql.connect( config.sql );

        for ( const statement of statements ) {
            if ( statement && statement.length > 0 ) {
                // execute each of the statements
                await sql.batch( statement ); // eslint-disable-line no-await-in-loop
            }
        }
    } catch ( err ) {
        console.log( err );
    } finally {
        sql.close();
    }
};

init().then( () => {
    console.log( "finished" );
} );
