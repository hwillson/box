BX.Collection.Customer = new Mongo.Collection('customers');

BX.Schema.Customer = new SimpleSchema({
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

BX.Collection.Customer.attachSchema(BX.Schema.Customer);
