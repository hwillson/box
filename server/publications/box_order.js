Meteor.publish('boxOrders', function (boxId) {
  check(boxId, String);
  return BX.Collection.BoxOrders.find({
    boxId: boxId
  });
});
