Meteor.methods({

  cancelBox: function (boxId) {
    check(boxId, String);
    return BoxManager.cancelBox(boxId);
  }

});
