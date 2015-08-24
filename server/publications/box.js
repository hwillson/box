Meteor.publish('boxNotCancelled', function (token, boxId) {
  check(token, String);
  check(boxId, String);
  if (BX.Utility.Security.verifyAccess(token, boxId)) {
    return BX.Collection.Boxes.find({
      _id: boxId,
      statusId: {
        $in: [ BX.Model.BoxStatus.active.id, BX.Model.BoxStatus.paused.id ]
      }
    });
  } else {
    this.ready();
  }
});

Meteor.publish('boxAnyStatus', function (token, boxId) {
  check(token, String);
  check(boxId, String);
  if (BX.Utility.Security.verifyAccess(token, boxId)) {
    return BX.Collection.Boxes.find({
      _id: boxId
    });
  } else {
    this.ready();
  }
});

Meteor.publish('allBoxes', function (token) {
  check(token, String);
  if (BX.Utility.Security.verifyAccess(token)) {
    return BX.Collection.Boxes.find();
  } else {
    this.ready();
  }
});
