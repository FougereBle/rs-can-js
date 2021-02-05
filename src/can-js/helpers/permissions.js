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

module.exports = getPermissions;
