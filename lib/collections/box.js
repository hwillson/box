BX.Collection.Boxes = new Mongo.Collection('boxes', {
  transform: function (doc) {
    var box = Object.create(doc);
    _.extend(box, BX.Model.Box);
    return box;
  }
});

//BX.Collection.Boxes = new AuditedCollection('boxes');

BX.Schema.Boxes = new SimpleSchema({
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
  migratedStartDate: {
    type: Date,
    label: 'Old Migrated Start Date',
    optional: true
  },
  renewalFrequencyId: {
    type: String,
    label: 'Renewal Frequency',
    defaultValue: BX.Model.BoxRenewalFrequency.m1.id
  },
  renewalDate: {
    type: Date,
    label: 'Renewal Date',
    optional: true
  },
  migratedRenewalDate: {
    type: Date,
    label: 'Old Migrated Renewal Date',
    optional: true
  },
  statusId: {
    type: String,
    label: 'Status ID',
    optional: true
  },
  shippingMethodId: {
    type: String,
    label: 'Shipping Method ID',
    optional: true
  },
  shippingMethodName: {
    type: String,
    label: 'Shipping Method Name',
    optional: true
  },
  shippingCost: {
    type: Number,
    label: 'Shipping Cost',
    optional: true
  }
});

BX.Collection.Boxes.attachSchema(BX.Schema.Boxes);
