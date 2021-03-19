const {
    createLogger,
    format,
    transports
} = require('winston');
const {
    ENVIRONMENT
} = require('../constants');



const {
    combine,
    timestamp,
    printf,
    splat
} = format;
require('winston-loggly-bulk');

function createCustomLoggerObject() {
    return createLogger({
        format: combine(
            timestamp(),
            splat(),
            printf(({
                level,
                message,
                timestamp
            }) => `[${level}][${timestamp}] ${message}`)
        ),
        transports: [
            new transports.Console(),
            new transports.Loggly({
                token: '223b4daf-7b2c-4299-9bd4-808e3df74577',
                subdomain: 'desafiotechton',
                tags: [ENVIRONMENT],
                json: true,
                timestamp: true,
                networkErrorsOnConsole: true,
                bufferOptions: {
                    size: 1000,
                    retriesInMilliSeconds: 60 * 1000
                }
            })
        ]
    });
}



module.exports = {
    create: createCustomLoggerObject
};
