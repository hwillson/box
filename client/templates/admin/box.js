Template.adminBox.onCreated(function () {
  var boxId = BX.Session.get('boxId');
  this.subscribe('boxAnyStatus', boxId);
  this.subscribe('boxItemsForBox', boxId);
  this.subscribe('boxOrders', boxId);
});

Template.adminBox.onRendered(function () {

  this.autorun(function () {
    if (Template.instance().subscriptionsReady()) {
      var box = BX.Collection.Box.findOne();
      if (box) {
        if (box.statusId === BX.Model.BoxStatus.paused.id) {
          Meteor.defer(function () {
            $('.box-pause').hide();
            $('.box-resume').show();
          });
        } else if (box.statusId === BX.Model.BoxStatus.cancelled.id) {
          Meteor.defer(function () {
            $('.box-controls').hide();
          });
        }
      }
    }
  });

})

Template.adminBox.helpers({

  box: function () {
    return BX.Collection.Box.findOne();
  },

  boxStatusLabel: function () {
    return BX.Model.BoxStatus[this.statusId].label;
  },

  boxItemsExist: function () {
    var box = BX.Collection.Box.findOne(), boxItemsCount = 0;
    if (box) {
      boxItemsCount = BX.Collection.BoxItem.find().count();
    }
    return boxItemsCount;
  },

  boxItems: function () {
    return BX.Collection.BoxItem.find();
  },

  orderHistory: function () {
    return BX.Collection.BoxOrder.find();
  }

});

Template.adminBox.events({

  'click .goto-boxes': function (e) {
    e.preventDefault;
    FlowRouter.go('/admin/boxes');
  },

  'click .box-pause': function (e) {
    e.preventDefault();
    updateBoxStatus(this._id, BX.Model.BoxStatus.paused.id);
    $('.box-pause').hide();
    $('.box-resume').show();
  },

  'click .box-resume': function (e) {
    e.preventDefault();
    updateBoxStatus(this._id, BX.Model.BoxStatus.active.id);
    $('.box-resume').hide();
    $('.box-pause').show();
  },

  'click .box-cancel': function (e) {
    e.preventDefault();
    updateBoxStatus(this._id, BX.Model.BoxStatus.cancelled.id);
    $('.box-controls').hide();
  }

});

var updateBoxStatus = function (boxId, statusId) {
  if (boxId && statusId) {
    BX.Collection.Box.update(
      { _id: boxId },
      {
        $set: {
          statusId: statusId
        }
      }
    );
  }
};
