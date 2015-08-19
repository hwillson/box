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
  variationId: {
    type: Number,
    label: 'Variation ID',
    optional: true
  },
  quantity: {
    type: Number,
    label: 'Quantity'
  },
  discountPercent: {
    type: Number,
    label : 'Discount Percent',
    optional: true
  }
});

BX.Collection.BoxItems.attachSchema(BX.Schema.BoxItems);

BX.Collection.BoxItems.addBoxItem = function (boxItem) {

  var boxItemId, filter, matchingBoxItem;

  filter = {
    boxId: boxItem.boxId,
    productId: boxItem.productId
  };

  if (boxItem.variationId) {
    filter.variationId = boxItem.variationId;
  }

  matchingBoxItem = BX.Collection.BoxItems.findOne(filter);
  if (matchingBoxItem) {
    matchingBoxItem.setQuantity(matchingBoxItem.quantity + boxItem.quantity);
    boxItemId = matchingBoxItem._id;
  } else {
    boxItemId = BX.Collection.BoxItems.insert(boxItem);
  }

  return boxItemId;

};
