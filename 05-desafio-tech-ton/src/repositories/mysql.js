const mysql = require('mysql');
const logger = require('../utils/logger');
const { ENVIRONMENT } = require('./constants');
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = require('../config')[ENVIRONMENT];



module.exports = function(_query) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE
        });

        connection.connect((err) => {
            if (err) {
                logger.info('Error in connect mysql');
                logger.info(err);

                connection.end();
                reject(err);

                return;
            }

            logger.info('Connected to mysql');

            logger.info(`Executing query: ${_query}`);


            connection.query(_query, (err, results) => {
                if (err) {
                    logger.info(err);
                    connection.end();
                    reject(err);
                    return;
                }
                logger.info('Query executed with success');

                logger.info('Closing connection');
                connection.end();
                logger.info('Connection closed');

                resolve(results);
            });
        });
    });
};
