Meteor.publish('singleCustomer', function (token, customerId) {
  check(token, String);
  check(customerId, String);
  if (BX.Utility.Security.verifyAccess(token)) {
    return BX.Collection.Customers.find({ _id: customerId });
  } else {
    this.ready();
  }
});
