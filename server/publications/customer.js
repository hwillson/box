Meteor.publish('singleCustomer', function (customerId) {
  check(customerId, String);
  return BX.Collection.Customers.find({ _id: customerId });
});
