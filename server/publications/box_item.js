Meteor.publish('boxItemsForBox', function (boxId) {
  check(boxId, String);
  return BX.Collection.BoxItems.find({ boxId: boxId });
});
