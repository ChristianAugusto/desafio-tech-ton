const mysql = require('mysql');
const { ENVIRONMENT } = require('../constants');
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = require('../config')[ENVIRONMENT];
const loggerHandler = require('../utils/logger');
const logger = loggerHandler.create();



module.exports = function(query) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE
        });

        connection.connect(function(error) {
            if (error) {
                logger.info(`Error in connect mysql, ${error}`);

                connection.end();
                reject(error);

                return;
            }

            connection.query(query, function(err, results) {
                if (err) {
                    logger.info(err);
                    connection.end();
                    reject(err);
                    return;
                }

                connection.end();

                resolve(results);
            });
        });
    });
};
