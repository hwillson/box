BX.Collection.Customers = new Mongo.Collection('customers');

BX.Schema.Customers = new SimpleSchema({
  externalId: {
    type: Number,
    label: 'External ID'
  },
  firstName: {
    type: String,
    label: 'First Name'
  },
  lastName: {
    type: String,
    label: 'Last Name'
  },
  email: {
    type: String,
    label: 'Email'
  }
});

BX.Collection.Customers.attachSchema(BX.Schema.Customers);
