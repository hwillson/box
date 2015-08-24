Meteor.methods({

  cancelBox: function (boxId) {
    check(boxId, String);
    return BoxManager.cancelBox(boxId);
  },

  createBoxRenewal: function (token, boxId) {
    check(token, String)
    check(boxId, String)
    if (BX.Utility.Security.verifyAccess(token)) {
      BoxManager.createBoxRenewal(boxId);
    }
  }

});
