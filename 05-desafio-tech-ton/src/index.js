const express = require('express');
const { PORT } = require('./constants');
const employeesRoutes = require('./routes/employees');
const statusRoutes = require('./routes/status');
const loggerHandler = require('./utils/logger');
const logger = loggerHandler.create();



const app = express();


app.use(express.json());


app.use('/employees', employeesRoutes);
app.use('/status', statusRoutes);


app.listen(PORT, () => logger.info(`Server running at port ${PORT}`));
