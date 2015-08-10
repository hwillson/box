Meteor.publish('singleBox', function (boxId) {
  check(boxId, String);
  return BX.Collection.Box.find({
    _id: boxId,
    statusId: {
      $in: [ BX.Model.BoxStatus.active.id, BX.Model.BoxStatus.paused.id ]
    }
  });
});

Meteor.publish('boxAnyStatus', function (boxId) {
  check(boxId, String);
  return BX.Collection.Box.find({
    _id: boxId
  });
});

Meteor.publish('allBoxes', function () {
  return BX.Collection.Box.find();
});
