Template.box.onCreated(function () {

  var boxId = BX.Session.get('boxId');
  this.subscribe('singleBox', boxId);
  this.subscribe('boxItemsForBox', boxId);

  // If called from an iframe, pass the content height back to the iframe so
  // it can re-size dynamically.
  if (window.location != window.parent.location) {
    this.autorun(function () {
      if (Template.instance().subscriptionsReady()) {
        Tracker.afterFlush(function () {
          $('img:last').on('load', function () {
            var parentUrl = Meteor.settings.public.boxPageUrl;
            $.postMessage({
              if_height: $('body').outerHeight(true)
            }, parentUrl, parent);
          });
        });
      }
    });
  }

});

Template.box.helpers({

  box: function () {
    return BX.Collection.Box.findOne();
  },

  boxStatusLabel: function () {
    return BX.Model.BoxStatus[this.statusId].label;
  },

  boxItemsExist: function () {
    return BX.Collection.BoxItem.find().count();
  },

  boxItems: function () {
    return BX.Collection.BoxItem.find();
  }

});

Template.box.events({

  'click .remove-box-item': function (e) {
    e.preventDefault();
    BX.Collection.BoxItem.remove({ _id: this._id });
  },

  'click .box-pause': function (e) {
    e.preventDefault();
    sweetAlert({
      title: 'Pause Your Monthly Box?',
      text: 'Are you sure you want to pause your monthly box? Pausing your monthly box means shipments will be put on-hold and you will not be charged until your resume your subscription.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Definitely',
      animation: false
    }, _.bind(function () {
      var boxId = this._id;
      BX.Collection.Box.update(
        { _id: boxId },
        {
          $set: {
            statusId: BX.Model.BoxStatus.paused.id
          }
        }
      );
      $('.box-pause').hide();
      $('.box-resume').show();
    }, this));
  }

})