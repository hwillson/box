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

  boxItemsExist: function () {
    return BX.Collection.BoxItem.find().count();
  },

  boxItems: function () {
    return BX.Collection.BoxItem.find();
  }

});
