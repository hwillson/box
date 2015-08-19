Meteor.publish('productVariations', function () {
  return BX.Collection.ProductVariations.find();
});
