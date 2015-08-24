Meteor.publish('boxOrders', function (token, boxId) {
  check(token, String);
  check(boxId, String);
  if (BX.Utility.Security.verifyAccess(token)) {
    return BX.Collection.BoxOrders.find({
      boxId: boxId
    });
  } else {
    this.ready();
  }
});
