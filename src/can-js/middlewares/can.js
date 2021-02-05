const config = require("../config");
const getPermissions = require("../helpers/permissions");

module.exports = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const role = config.roles[req.user.role];
    const permissions = getPermissions(role);

    if (!permissions.includes(permission)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  };
};
