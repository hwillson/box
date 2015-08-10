Template.adminBoxes.onCreated(function () {
  this.subscribe('allBoxes');
});

Template.adminBoxes.helpers({

  settings: function () {
    return {
      collection: BX.Collection.Box.find(),
      fields: [
        {
          key: 'referenceId',
          label: 'Box ID'
        },
        {
          key: 'statusId',
          label: 'Status',
          fn: function (value, object) {
            return BX.Model.BoxStatus[value].label;
          }
        },
        {
          key: 'customerFirstName',
          label: 'Customer First Name'
        },
        {
          key: 'customerLastName',
          label: 'Customer Last Name'
        },
        {
          key: 'customerEmail',
          label: 'Customer Email'
        },
        {
          key: 'startDate',
          label: 'Start Date',
          fn: function (value, object) {
            return BX.Utility.Date.format(value);
          }
        },
        {
          key: 'renewalDate',
          label: 'Next Renewal Date',
          fn: function (value, object) {
            return BX.Utility.Date.format(value);
          }
        }
      ]
    };
  }

});

Template.adminBoxes.events({

  'click tbody tr': function (e) {
    FlowRouter.go('/admin/box?id=' + this._id);
  }

});
