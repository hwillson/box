Meteor.publish('singleBox', function (boxId) {
  check(boxId, String);
  return BX.Collection.Box.find({
    _id: boxId,
    statusId: {
      $in: [ BX.Model.BoxStatus.active.id, BX.Model.BoxStatus.paused.id ]
    }
  });
});
