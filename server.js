const { app } = require('./app');
const config = require('./config');

app.listen(config.PORT, () => {
  console.log(`SERVER IS RUNNING ON ${config.PORT}`);
});
