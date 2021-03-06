Template.adminBox.onCreated(function () {
  var token = BX.Session.get('token'), boxId = BX.Session.get('boxId');
  this.subscribe('boxAnyStatus', token, boxId, {
    onReady: _.bind(function () {
      var box = BX.Collection.Boxes.findOne();
      this.subscribe('singleCustomer', token, box.customerId);
    }, this)
  });
  this.subscribe('productVariations');
  this.subscribe('boxItemsForBox', token, boxId);
  this.subscribe('boxOrders', token, boxId);
});

Template.adminBox.onRendered(function () {

  this.autorun(function () {
    if (Template.instance().subscriptionsReady()) {

      var box = BX.Collection.Boxes.findOne();
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

});

Template.adminBox.helpers({

  box: function () {
    return BX.Collection.Boxes.findOne();
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

  ordersExist: function () {
    return BX.Collection.BoxOrders.find().count();
  },

  orderHistory: function () {
    return BX.Collection.BoxOrders.find();
  },

  customerUrl: function () {
    var customer = this.getCustomer();
    return Meteor.settings.public.customerUrl + customer.externalId;
  },

  customerOrdersUrl: function () {
    var customer = this.getCustomer();
    return Meteor.settings.public.customerOrdersUrl + customer.externalId;
  }

});

Template.adminBox.events({

  'click .goto-boxes': function (e) {
    e.preventDefault;
    FlowRouter.go('/admin/boxes?token=' + BX.Session.get('token'));
  },

  'click .box-pause': function (e) {
    e.preventDefault();
    this.updateBoxStatus(BX.Model.BoxStatus.paused.id);
    $('.box-pause').hide();
    $('.box-resume').show();
  },

  'click .box-resume': function (e) {
    e.preventDefault();
    this.updateBoxStatus(BX.Model.BoxStatus.active.id);
    $('.box-resume').hide();
    $('.box-pause').show();
  },

  'click .box-cancel': function (e) {
    e.preventDefault();
    this.cancelBox();
    $('.box-controls').hide();
  },

  'change .box-renewal-date': _.debounce(function (e) {
    var selectedDate = $(e.currentTarget).val();
    if (selectedDate) {
      this.updateRenewalDate(selectedDate);
    } else {
      $(e.currentTarget).val(BX.Utility.Date.formatDate(this.renewalDate));
    }
  }, 100),

  'change .box-renewal-freq': function (e) {
    var frequencyId = $(e.currentTarget).find(':selected').val();
    this.updateRenewalFrequency(frequencyId);
  },

  'click .box-renew-now': function (e) {
    e.preventDefault();
    sweetAlert({
      title: 'Renew Box Immediately?',
      text: 'This will immediately create a new renewal order (and bill the customer). Are you sure?',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Renew Now',
      closeOnConfirm: false,
      confirmButtonColor: '#D0D0D0',
      animation: false
    }, _.bind(function () {
      $('.confirm').html('Renewing...');
      Meteor.call(
        'createBoxRenewal',
        BX.Session.get('token'),
        this._id,
        function () {
          swal('Renewal order has been created.');
        }
      );
    }, this));
  }

});
