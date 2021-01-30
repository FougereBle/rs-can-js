const config = require("../config");

const getPermissions = (role) => {
  const permissions = role.permissions;

  if (role.extends) {
    role.extends.forEach((roleName) => {
      const role = config.roles[roleName];
      const permissionsOfRole = getPermissions(role);

      permissionsOfRole.forEach((p) => {
        if (!permissions.includes(p)) {
          permissions.push(p);
        }
      });
    });
  }

  return permissions;
};

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
