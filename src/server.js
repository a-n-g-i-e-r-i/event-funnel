const { app } = require('./app');
const config = require('./config');

const logger = config.LOGGER;

app.listen(config.PORT, () => {
  logger.info(`SERVER IS RUNNING ON ${config.PORT}`);
});
