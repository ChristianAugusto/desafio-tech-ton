const express = require('express');
const os = require('os');
const { PORT, ENVIRONMENT } = require('../../constants/index');



const router = express.Router();

router.get('/', function (req, res) {
    return res.status(200).json({
        PORT,
        ENVIRONMENT,
        message: 'API Online',
        host_node_version: process.version,
        host_system: os.type(),
        host_system_version: os.release()
    }).end();
});



module.exports = router;
