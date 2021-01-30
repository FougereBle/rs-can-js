# RS Can JS

RS Can JS est une bibliothèque pour gérer l'autorisation avec Express.

## Installation

```
npm i https://github.com/FougereBle/rs-can-js.git
```

## Initialisation

RS Can JS à besoin d'être initialisé avant de pouvoir être utilisé.

```js
const canjs = require("rs-can-js");

const roles = {
  user: {
    extends: [],
    permissions: ["manage_profile"], // Liste des permissions
  },
  moderator: {
    extends: ["user"], // Le role "moderator" aura aussi les permissions du role "user"
    permissions: ["manage_forum"],
  },
  admin: {
    extends: ["moderator"], // Le role "admin" aura aussi les permissions du role "moderator" ainsi que "user"
    permissions: ["manage_users"],
  },
},

canjs.initialize({
  roles: roles, // Liste des roles
});
```

## Middleware

Pour protéger vos routes.

Le middleware attend une variable `req.user` contenant au moins une propriété `role`.

Cette propriété doit contenir le nom du rôle.

Par exemple `user`, `moderator` ou `admin` si on reprend les rôles indiqués plus haut.

```js
const canjs = require("rs-can-js");

router.post("/profile", canjs.can("manage_profile"), ...);
router.post("/manage/users", canjs.can("manage_users"), ...);
```
