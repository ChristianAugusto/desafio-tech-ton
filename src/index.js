const express = require('express');
const { PORT, ENVIRONMENT } = require('./constants');
const employeesRoutes = require('./routes/employees');
const statusRoutes = require('./routes/status');
const loggerHandler = require('./utils/logger');
const logger = loggerHandler.create();



const app = express();


app.use(express.json());


app.use('/api/employees', employeesRoutes);
app.use('/api/status', statusRoutes);


if (ENVIRONMENT == 'docker') {
    app.listen(PORT, '0.0.0.0', () => logger.info(`Server running at port ${PORT}`));
}
else {
    app.listen(PORT, () => logger.info(`Server running at port ${PORT}`));
}
