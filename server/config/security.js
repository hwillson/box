BX.Collection.Boxes.permit(['update']).apply();
BX.Collection.BoxItems.permit(['remove', 'update']).apply();

// Restrict DDP access by IP.
Meteor.onConnection(function (connection) {
  var whitelistIps = Meteor.settings.private.whitelistIps;
  if (whitelistIps.indexOf(connection.clientAddress) === -1) {
    connection.close();
  }
});

// Restrict access to all simple:rest routes by IP.
JsonRoutes.Middleware.use(function (req, res, next) {
  var ip, whitelistIps;
  ip = req.headers['x-forwarded-for'];
  whitelistIps = Meteor.settings.private.whitelistIps;
  if (whitelistIps.indexOf(ip) === -1) {
    res.end();
  } else {
    next();
  }
});
