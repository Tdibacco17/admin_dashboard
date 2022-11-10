import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();
// import session from "express-session";
// import mysql2 from "mysql2/promise"
// import MySQLStore from "express-mysql-session"

export const environment = {
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_SENDER: process.env.EMAIL_SENDER,

    JWT_SECRET: process.env.JWT_SECRET,

    CONNECTION_HOST: process.env.CONNECTION_HOST,
    CONNECTION_DATABASE: process.env.CONNECTION_DATABASE,
    CONNECTION_USER: process.env.CONNECTION_USER,
    CONNECTION_PASSWORD: process.env.CONNECTION_PASSWORD,
    CONNECTION_PORT: process.env.CONNECTION_PORT,
}
export const connection = mysql.createConnection({
    host: environment.CONNECTION_HOST,
    database: environment.CONNECTION_DATABASE,
    user: environment.CONNECTION_USER,
    password: environment.CONNECTION_PASSWORD,
    port: environment.CONNECTION_PORT,
});

// const options = {
//     host: environment.CONNECTION_HOST,
//     port: environment.CONNECTION_PORT,
//     user: environment.CONNECTION_USER,
//     password: environment.CONNECTION_PASSWORD,
//     database: environment.CONNECTION_DATABASE,
// };

// const SQLStore = MySQLStore(session);

// const connectionCookies = mysql2.createPool(options);
// const sessionStore = new SQLStore({}, connectionCookies);

// import promiseAdapter from 'express-session-mysql2-promise-adapter';
// import express from 'express';
// import SQLSession from 'express-mysql-session';
// import mysqlPromise from 'mysql2/promise';

// const port = 8085;
// // const SQLStore = SQLSession(session);
// // const sessionStore = new SQLStore({}, promiseAdapter(db)); //seria la conexion con mySql el db
// const localSession = {
//     store: sessionStore,
//     secret: 'test_secret',
//     resave: true,
//     rolling: true,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 99999,
//         httpOnly: false
//     }
// };


