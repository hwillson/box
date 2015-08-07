Meteor.publish('boxItemsForBox', function (boxId) {
  check(boxId, String);
  return BX.Collection.BoxItem.find({ boxId: boxId });
});