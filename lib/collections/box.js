BX.Collection.Box = new Mongo.Collection('boxes');

BX.Schema.Box = new SimpleSchema({
  referenceId: {
    type: Number,
    label: 'Box Reference ID'
  },
  customerId: {
    type: String,
    label: 'Customer ID',
    optional: true
  },
  customerFirstName: {
    type: String,
    label: 'Customer First Name'
  },
  customerLastName: {
    type: String,
    label: 'Customer Last Name'
  },
  customerEmail: {
    type: String,
    label: 'Email'
  },
  startDate: {
    type: Date,
    label: 'Start Date',
    optional: true
  },
  renewalDate: {
    type: Date,
    label: 'Renewal Date',
    optional: true
  },
  statusId: {
    type: String,
    label: 'Status ID',
    optional: true
  }
});

BX.Collection.Box.attachSchema(BX.Schema.Box);

BX.Collection.Box.helpers({

  customerName: function () {
    return this.customerFirstName + ' ' + this.customerLastName;
  }

});
