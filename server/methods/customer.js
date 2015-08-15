Meteor.methods({

  createCustomer: function (customer) {
    var existingCustomer, customerId;
    check(customer, Object);
    existingCustomer =
      BX.Collection.Customers.findOne({ externalId: customer.externalId });
    if (!existingCustomer) {
      customerId = BX.Collection.Customers.insert(customer);
    } else {
      customerId = existingCustomer._id;
    }
    return customerId;
  }

});
