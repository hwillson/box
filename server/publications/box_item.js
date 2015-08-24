Meteor.publish('boxItemsForBox', function (token, boxId) {
  check(token, String);
  check(boxId, String);
  if (BX.Utility.Security.verifyAccess(token, boxId)) {
    return BX.Collection.BoxItems.find({ boxId: boxId });
  } else {
    this.ready();
  }
});
