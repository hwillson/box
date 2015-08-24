BX.Collection.Boxes.permit(['update']).apply();
BX.Collection.BoxItems.permit(['remove', 'update']).apply();

// Restrict simple:rest access to only /methods/api* methods.
JsonRoutes.Middleware.use(function (req, res, next) {
  if (req.url.indexOf('/methods/api') === 0) {
    next();
  } else {
    res.end();
  }
});

// Restrict DDP access by IP.
/*
Meteor.onConnection(function (connection) {
  var ip, whitelistIps;
  ip = connection.httpHeaders['x-forwarded-for'];
  whitelistIps = Meteor.settings.private.whitelistIps;
  console.log('Incoming DDP IP: ' + ip);
  if (whitelistIps.indexOf(ip) === -1) {
    connection.close();
  }
});
*/

// Restrict access to all simple:rest routes by IP.
/*
JsonRoutes.Middleware.use(function (req, res, next) {
  var ip, whitelistIps;
  ip = req.headers['x-forwarded-for'];
  whitelistIps = Meteor.settings.private.whitelistIps;
  //console.log('Incoming REST IP: ' + ip);
  if (whitelistIps.indexOf(ip) === -1) {
    res.end();
  } else {
    next();
  }
});
*/

BX.Utility.Security = {
  verifyAccess: function (token, boxId) {
    var hasAccess = false, adminToken, customerToken;
    adminToken =
      CryptoJS.SHA1(Meteor.settings.private.adminTokenSecret).toString();
    if (token && (token === adminToken)) {
      hasAccess = true;
    }
    if (!hasAccess && boxId) {
      customerToken = CryptoJS.SHA1(
        boxId + Meteor.settings.private.customerTokenSecret
      ).toString();
      if (token && (token === customerToken)) {
        hasAccess = true;
      }
    }
    return hasAccess;
  }
};
