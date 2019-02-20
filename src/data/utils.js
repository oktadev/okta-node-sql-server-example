const fse = require( "fs-extra" );
const { join } = require( "path" );

const loadSqlQueries = async folderName => {
    const filePath = join( process.cwd(), "src", "data", folderName );
    const files = await fse.readdir( filePath );
    const sqlFiles = files.filter( f => f.endsWith( ".sql" ) );
    const queries = {};
    for ( let i = 0; i < sqlFiles.length; i++ ) {
        const query = fse.readFileSync( join( filePath, sqlFiles[ i ] ), { encoding: "UTF-8" } );
        queries[ sqlFiles[ i ].replace( ".sql", "" ) ] = query;
    }
    return queries;
};

module.exports = {
    loadSqlQueries
};
