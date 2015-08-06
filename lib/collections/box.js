BX.Collections.Box = new Mongo.Collection('boxes');

BX.Schemas.Box = new SimpleSchema({
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

BX.Collections.Box.attachSchema(BX.Schemas.Box);
