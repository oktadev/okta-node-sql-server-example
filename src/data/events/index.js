"use strict";

const sql = require( "mssql" );
const utils = require( "../utils" );

const register = async ( { getPool } ) => {
    const sqlQueries = await utils.loadSqlQueries( "events" );

    const getEvents = async userId => {
        const pool = await getPool();
        const request = await pool.request();
        request.input( "userId", sql.VarChar( 50 ), userId );
        return request.query( sqlQueries.getEvents );
    };

    const addEvent = async ( { userId, title, description, startDate, startTime, endDate, endTime } ) => {
        const pool = await getPool();
        const request = await pool.request();
        request.input( "userId", sql.VarChar( 50 ), userId );
        request.input( "title", sql.NVarChar( 200 ), title );
        request.input( "description", sql.NVarChar( 1000 ), description );
        request.input( "startDate", sql.Date, startDate );
        request.input( "startTime", sql.Time, startTime );
        request.input( "endDate", sql.Date, endDate );
        request.input( "endTime", sql.Time, endTime );
        return request.query( sqlQueries.addEvent );
    };

    const updateEvent = async ( { id, userId, title, description, startDate, startTime, endDate, endTime } ) => {
        const pool = await getPool();
        const request = await pool.request();
        request.input( "id", sql.Int, id );
        request.input( "userId", sql.VarChar( 50 ), userId );
        request.input( "title", sql.NVarChar( 200 ), title );
        request.input( "description", sql.NVarChar( 1000 ), description );
        request.input( "startDate", sql.Date, startDate );
        request.input( "startTime", sql.Time, startTime );
        request.input( "endDate", sql.Date, endDate );
        request.input( "endTime", sql.Time, endTime );
        return request.query( sqlQueries.updateEvent );
    };

    const deleteEvent = async ( { id, userId } ) => {
        const pool = await getPool();
        const request = await pool.request();
        request.input( "id", sql.Int, id );
        request.input( "userId", sql.VarChar( 50 ), userId );
        return request.query( sqlQueries.deleteEvent );
    };

    return {
        addEvent,
        deleteEvent,
        getEvents,
        updateEvent
    };
};

module.exports = { register };
