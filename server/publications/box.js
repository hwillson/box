Meteor.publish('boxNotCancelled', function (boxId) {
  check(boxId, String);
  return BX.Collection.Boxes.find({
    _id: boxId,
    statusId: {
      $in: [ BX.Model.BoxStatus.active.id, BX.Model.BoxStatus.paused.id ]
    }
  });
});

Meteor.publish('boxAnyStatus', function (boxId) {
  check(boxId, String);
  return BX.Collection.Boxes.find({
    _id: boxId
  });
});

Meteor.publish('allBoxes', function () {
  return BX.Collection.Boxes.find();
});
