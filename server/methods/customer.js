Meteor.methods({

  createCustomer: function (customer) {
    var existingCustomer, customerId;
    check(customer, Object);
    existingCustomer =
      BX.Collection.Customer.findOne({ externalId: customer.externalId });
    if (!existingCustomer) {
      customerId = BX.Collection.Customer.insert(customer);
    } else {
      customerId = existingCustomer._id;
    }
    return customerId;
  }

});
