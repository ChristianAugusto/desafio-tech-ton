const loggerHandler = require('../utils/logger');



module.exports = function(requiredFields, obj) {
    const logger = loggerHandler.create();

    try {
        const fields = Object.keys(obj);

        for (let i = 0; i < requiredFields.length; i++) {
            const value = obj[requiredFields[i]];

            if (fields.indexOf(requiredFields[i]) === -1) {
                logger.info(`${requiredFields[i]}`);
                return false;
            }
            if (value === '') {
                logger.info(`${requiredFields[i]}`);
                return false;
            }
            if (value === null) {
                logger.info(`${requiredFields[i]}`);
                return false;
            }
            if (Array.isArray(value) && value.length === 0) {
                logger.info(`${requiredFields[i]}`);
                return false;
            }
        }

        return true;
    }
    catch (error) {
        logger.info(`Error in validate required fields, ${JSON.stringify({
            error: error.message || error.data || error.error || error
        })}`);

        return false;
    }
};
