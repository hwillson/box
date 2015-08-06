BX.Collections.Customer = new Mongo.Collection('customers');

BX.Schemas.Customer = new SimpleSchema({
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

BX.Collections.Customer.attachSchema(BX.Schemas.Customer);
