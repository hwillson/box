Meteor.publish('singleBox', function (boxId) {
  check(boxId, String);
  return BX.Collection.Box.find({ _id: boxId });
});