BX.Collection.Box = new Mongo.Collection('boxes');

BX.Schema.Box = new SimpleSchema({
  customerId: {
    type: String,
    label: 'Customer ID',
    optional: true
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
