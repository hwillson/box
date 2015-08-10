Meteor.publish('boxOrders', function (boxId) {
  check(boxId, String);
  return BX.Collection.BoxOrder.find({
    boxId: boxId
  });
});
