'use strict';

var config = {
  roles: null
};

var getPermissions = function getPermissions(role) {
  var permissions = role.permissions;

  if (role["extends"]) {
    role["extends"].forEach(function (roleName) {
      var role = config.roles[roleName];
      var permissionsOfRole = getPermissions(role);
      permissionsOfRole.forEach(function (p) {
        if (!permissions.includes(p)) {
          permissions.push(p);
        }
      });
    });
  }

  return permissions;
};

var can = function (permission) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }

    var role = config.roles[req.user.role];
    var permissions = getPermissions(role);

    if (!permissions.includes(permission)) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }

    next();
  };
};

var canJs = {
  Config: config,
  initialize: function initialize(config) {
    var _this = this;

    Object.keys(config).forEach(function (key) {
      _this.Config[key] = config[key];
    });
  },
  can: can
};

var src = canJs;

module.exports = src;
