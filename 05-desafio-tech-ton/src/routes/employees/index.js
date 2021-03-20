const express = require('express');
const mysql = require('../../repositories/mysql');
const numberInStr = require('../../utils/number-in-str');
const loggerHandler = require('../../utils/logger');
const logger = loggerHandler.create();



const router = express.Router();



function SELECT_EMPLOYEES_QUERY_BUILDER(fields='*', conditions='', limit='') {
    return `SELECT ${fields} FROM \`employees\` ${conditions} ${limit}`.trim();
}


router.get('/', async function(req, res) {
    try {
        res.status(200).json({
            data: null,
            message: 'Success'
        }).end();
    }
    catch (error) {
        res.status(500).json({
            data: error.message || error.data || error.error || error,
            message: 'Error on process checkout notification'
        }).end();
    }
});

router.get('/:id', async function(req, res) {
    try {
        const id = req.params.id;

        if (!numberInStr(id)) {
            res.status(400).json({
                data: null,
                message: 'Invalid id type, check if it is number'
            }).end();
        }


        const fields = req.query.fields ? 
            req.query.fields.split(',').map((field) => `\`${field}\``).join(',')
            :
            '*';

        const query = SELECT_EMPLOYEES_QUERY_BUILDER(fields, `WHERE \`id\` = ${id}`);

        const result = await mysql(query);


        res.status(200).json({
            data: result[0],
            message: 'Success'
        }).end();
    }
    catch (error) {
        logger.info(`Error in GET employees by id, ${JSON.stringify({
            query: req.query,
            body: req.body
        })}`);
        res.status(500).json({
            data: error.message || error.data || error.error || error,
            message: 'Error on process checkout notification'
        }).end();
    }
});

router.post('/', function(req, res) {
    res.status(200).json({
        foo: 'foo'
    }).end();
});



module.exports = router;
