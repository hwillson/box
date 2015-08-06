Meteor.methods({

  createCustomer: function (customer) {
    var existingCustomer, customerId;
    check(customer, Object);
    existingCustomer =
      BX.Collections.Customer.findOne({ externalId: customer.externalId });
    if (!existingCustomer) {
      customerId = BX.Collections.Customer.insert(customer);
    } else {
      customerId = existingCustomer._id;
    }
    return customerId;
  }

});
