BX.Collection.BoxItems = new Mongo.Collection('box_items', {
  transform: function (doc) {
    var boxItem = Object.create(doc);
    _.extend(boxItem, BX.Model.BoxItem);
    return boxItem;
  }
});

BX.Schema.BoxItems = new SimpleSchema({
  boxId: {
    type: String,
    label: 'Box ID',
    optional: true
  },
  productId: {
    type: Number,
    label: 'Product ID'
  },
  productUrl: {
    type: String,
    label: 'Product URL'
  },
  productName: {
    type: String,
    label: 'Product Name'
  },
  productImage: {
    type: String,
    label: 'Product Image'
  },
  variationId: {
    type: Number,
    label: 'Variation ID',
    optional: true
  },
  variationDetails: {
    type: String,
    label: 'Variation Details',
    optional: true
  },
  quantity: {
    type: Number,
    label: 'Quantity'
  },
  productPrice: {
    type: Number,
    label: 'Product Price',
    decimal: true
  },
  discountedPrice: {
    type: Number,
    label: 'Discounted Price',
    decimal: true,
    optional: true
  }
});

BX.Collection.BoxItems.attachSchema(BX.Schema.BoxItems);

BX.Collection.BoxItems.totalDiscountedAmount = function (boxId) {
  var boxItems, total = 0;
  boxItems = BX.Collection.BoxItems.find({ boxId: boxId });
  boxItems.forEach(function (boxItem) {
    total += boxItem.totalDiscountedPrice();
  });
  return total;
};
