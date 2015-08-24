Template.adminBoxes.onCreated(function () {
  this.subscribe('allBoxes', BX.Session.get('token'));
});

Template.adminBoxes.helpers({

  settings: function () {
    return {
      collection: BX.Collection.Boxes,
      fields: [
        {
          key: '_id',
          label: 'Box ID'
        },
        {
          key: 'statusId',
          label: 'Status',
          fn: function (value, object) {
            if (value) {
              return BX.Model.BoxStatus[value].label;
            }
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
            return BX.Utility.Date.formatDate(value);
          }
        },
        {
          key: 'renewalDate',
          label: 'Next Renewal Date',
          fn: function (value, object) {
            return BX.Utility.Date.formatDate(value);
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
