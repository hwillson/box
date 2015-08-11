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
  totalPrice: {
    type: Number,
    label: 'Total Item Price',
    decimal: true
  }
});

BX.Collection.BoxItems.attachSchema(BX.Schema.BoxItems);
