const config = require("./config");
const canMiddleware = require("./middlewares/can");

module.exports = {
  Config: config,
  initialize(config) {
    Object.keys(config).forEach((key) => {
      this.Config[key] = config[key];
    });
  },
  can: canMiddleware,
};
