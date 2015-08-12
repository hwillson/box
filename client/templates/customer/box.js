Template.box.onCreated(function () {

  var boxId = BX.Session.get('boxId');
  this.subscribe('boxNotCancelled', boxId);
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

Template.box.onRendered(function () {

  this.autorun(function () {
    if (Template.instance().subscriptionsReady()) {

      var box = BX.Collection.Boxes.findOne();
      if (box && (box.statusId === BX.Model.BoxStatus.paused.id)) {
        Meteor.defer(function () {
          $('.box-pause').hide();
          $('.box-resume').show();
        });
      }

      Meteor.defer(function () {
        $('.box-renewal-date').datepicker({
          format: 'yyyy-mm-dd',
          startDate: moment().add(1, 'days').format('YYYY-MM-DD')
        });
      });

      Meteor.defer(function () {
        $('.box-renewal-freq').val(box.renewalFrequencyId);
      });

    }
  });

})

Template.box.helpers({

  box: function () {
    return BX.Collection.Boxes.findOne();
  },

  boxRenewalDate: function () {
    var box = BX.Collection.Boxes.findOne();
    return BX.Utility.Date.formatDate(box.renewalDate);
  },

  boxStatusLabel: function () {
    return BX.Model.BoxStatus[this.statusId].label;
  },

  boxItemsExist: function () {
    var box = BX.Collection.Boxes.findOne(), boxItemsCount = 0;
    if (box) {
      boxItemsCount = BX.Collection.BoxItems.find().count();
    }
    return boxItemsCount;
  },

  boxItems: function () {
    return BX.Collection.BoxItems.find();
  },

  boxTotal: function () {
    var box = BX.Collection.Boxes.findOne();
    return BX.Collection.BoxItems.totalDiscountedAmount(box._id);
  }

});

Template.box.events({

  'click .remove-box-item': function (e) {
    e.preventDefault();
    this.remove();
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
      this.updateBoxStatus(BX.Model.BoxStatus.paused.id);
      $('.box-pause').hide();
      $('.box-resume').show();
    }, this));
  },

  'click .box-resume': function (e) {
    this.updateBoxStatus(BX.Model.BoxStatus.active.id);
    $('.box-resume').hide();
    $('.box-pause').show();
  },

  'click .box-cancel': function (e) {
    e.preventDefault();
    sweetAlert({
      title: 'Cancel Your Monthly Box?',
      text: 'Are you sure you want to cancel your monthly box? Cancelling will completely remove your box from your account (all box selections will be removed). You will no longer receive monthly shipments.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Definitely',
      animation: false
    }, _.bind(function () {
      this.updateBoxStatus(BX.Model.BoxStatus.cancelled.id);
    }, this));
  },

  'change .box-renewal-date': _.debounce(function (e) {
    var selectedDate = $(e.currentTarget).val();
    this.updateRenewalDate(selectedDate);
  }, 100),

  'change .box-renewal-freq': function (e) {
    var frequencyId = $(e.currentTarget).find(':selected').val();
    this.updateRenewalFrequency(frequencyId);
  },

  'click .quantity-up': function (e) {
    this.setQuantity(this.quantity + 1);
    $(e.currentTarget).blur();
  },

  'click .quantity-down': function (e) {
    var quantity = this.quantity;
    if (quantity > 1) {
      this.setQuantity(this.quantity - 1);
    }
    $(e.currentTarget).blur();
  },

  'change .quantity': function (e) {
    var quantity = $(e.currentTarget).val();
    this.setQuantity(quantity);
  }

});
