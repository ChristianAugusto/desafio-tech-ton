const express = require('express');
const mysql = require('../../repositories/mysql');
const numberInStr = require('../../utils/number-in-str');
const validateRequiredFields = require('../../modules/validate-required-fields');
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

router.post('/', async function(req, res) {
    try {
        const requiredFields = [
            'name', 'birthDate', 'jobTitle'
        ];

        if (!validateRequiredFields(requiredFields, req.body)) {
            return res.status(400).json({
                created: false,
                data: null,
                message: `One or more required fields are missing: ${requiredFields}`
            }).end();
        }


        const query = `
            INSERT INTO employees
                (\`name\`, \`birthDate\`, \`jobTitle\`)
            VALUES
                ('${req.body.name}', '${req.body.birthDate}', '${req.body.jobTitle}')
        `;

        const queryResult = await mysql(query);


        return res.status(200).json({
            created: true,
            data: {
                insertId: queryResult.insertId
            },
            message: 'Success'
        }).end();
    }
    catch (error) {
        logger.info(`Error in POST employees by id, ${JSON.stringify({
            query: req.query,
            body: req.body,
            error: error.message || error.data || error.error || error
        })}`);
        return res.status(500).json({
            created: false,
            data: error.message || error.data || error.error || error,
            message: 'Error in POST employees by id'
        }).end();
    }
});

router.put('/:id', async function(req, res) {
    try {
        const id = req.params.id;

        if (!numberInStr(id)) {
            return res.status(400).json({
                data: null,
                message: 'Invalid id type, check if it is number'
            }).end();
        }


        const allowedFields = [
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'birthDate',
                type: 'string'
            },
            {
                name: 'jobTitle',
                type: 'string'
            }
        ];


        const sets = [];

        Object.entries(req.body).forEach(function([key, value]) {
            const allowedField = allowedFields.filter(field => field.name === key);

            if (allowedField.length > 0) {
                if (allowedField[0].type === 'string') {
                    sets.push(`\`${key}\`='${value}'`);
                }
            }
        });


        if (sets.length > 0) {
            const query = `UPDATE \`employees\` SET ${sets.join(',')} WHERE \`id\` = ${id}`;

            await mysql(query);


            return res.status(200).json({
                updated: true,
                data: null,
                message: 'Success'
            }).end();
        }


        return res.status(200).json({
            updated: false,
            data: null,
            message: 'No props to update'
        }).end();
    }
    catch (error) {
        logger.info(`Error in PUT employees by id, ${JSON.stringify({
            query: req.query,
            body: req.body,
            error: error.message || error.data || error.error || error
        })}`);
        return res.status(500).json({
            updated: false,
            data: error.message || error.data || error.error || error,
            message: 'Error in PUT employees by id'
        }).end();
    }
});

router.delete('/:id', async function(req, res) {
    try {
        const id = req.params.id;

        if (!numberInStr(id)) {
            return res.status(400).json({
                deleted: false,
                data: null,
                message: 'Invalid id type, check if it is number'
            }).end();
        }

        const query = `DELETE FROM \`employees\` WHERE \`id\` = ${id}`;

        await mysql(query);

        return res.status(200).json({
            deleted: true,
            data: null,
            message: 'Success'
        }).end();
    }
    catch (error) {
        logger.info(`Error in DELETE employees by id, ${JSON.stringify({
            query: req.query,
            body: req.body,
            error: error.message || error.data || error.error || error
        })}`);
        return res.status(500).json({
            deleted: false,
            data: error.message || error.data || error.error || error,
            message: 'Error in DELETE employees by id'
        }).end();
    }
});



module.exports = router;
