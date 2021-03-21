const express = require('express');
const moment = require('moment-timezone');
const mysql = require('../../repositories/mysql');
const numberInStr = require('../../utils/number-in-str');
const deleteArrayPosition = require('../../utils/delete-array-position');
const loggerHandler = require('../../utils/logger');
const { EMPLOYEES_LIMIT } = require('../../constants');
const logger = loggerHandler.create();



const router = express.Router();



function SELECT_EMPLOYEES_QUERY_BUILDER(fields='*', conditions='', limit='') {
    return `SELECT ${fields} FROM \`employees\` ${conditions} ${limit}`.trim();
}


router.get('/', async function(req, res) {
    try {
        let fields = req.query.fields ? 
            req.query.fields.split(',').map((field) => `\`${field}\``).join(',')
            :
            '*';

        let startIndex = 0;
        if (numberInStr(req.query.startIndex)) {
            startIndex = Number(req.query.startIndex);
        }

        const query = SELECT_EMPLOYEES_QUERY_BUILDER(fields, '', `LIMIT ${startIndex},${EMPLOYEES_LIMIT}`);

        const queryResult = await mysql(query);


        if (fields === '*' || fields.indexOf('birthDate') != -1) {
            for (let i = 0; i < queryResult.length; i++) {
                queryResult[i].birthDate = new Date(queryResult[i].birthDate).toISOString().split('T')[0];
            }
        }


        return res.status(200).json({
            data: queryResult,
            message: 'Success'
        }).end();
    }
    catch (error) {
        logger.info(`Error in GET employees, ${JSON.stringify({
            query: req.query,
            body: req.body,
            error: error.message || error.data || error.error || error
        })}`);
        return res.status(500).json({
            data: error.message || error.data || error.error || error,
            message: 'Error in GET employees'
        }).end();
    }
});

router.get('/:id', async function(req, res) {
    try {
        const id = req.params.id;

        if (!numberInStr(id)) {
            return res.status(400).json({
                data: null,
                message: 'Invalid id type, check if it is number'
            }).end();
        }


        let fields = req.query.fields ? 
            req.query.fields.split(',').map((field) => `\`${field}\``).join(',')
            :
            '*';

        const query = SELECT_EMPLOYEES_QUERY_BUILDER(fields, `WHERE \`id\` = ${id}`);

        const queryResult = await mysql(query);

        if (queryResult.length === 0) {
            return res.status(200).json({
                data: null,
                message: 'There is not employee for given id'
            }).end();
        }

        const employee = queryResult[0];


        if (employee.birthDate) {
            /*
                Formating date mysql to YYYYY-MM-DD
            */
            employee.birthDate = new Date(employee.birthDate).toISOString().split('T')[0];
        }


        return res.status(200).json({
            data: employee,
            message: 'Success'
        }).end();
    }
    catch (error) {
        logger.info(`Error in GET employees by id, ${JSON.stringify({
            query: req.query,
            body: req.body,
            error: error.message || error.data || error.error || error
        })}`);
        return res.status(500).json({
            data: error.message || error.data || error.error || error,
            message: 'Error in GET employees by id'
        }).end();
    }
});

router.post('/', function(req, res) {
    return res.status(200).json({
        foo: 'foo'
    }).end();
});



module.exports = router;
