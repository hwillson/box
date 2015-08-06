BX.Collections.BoxItem = new Mongo.Collection('box_items');

BX.Schemas.BoxItem = new SimpleSchema({
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
  totalPrice: {
    type: Number,
    label: 'Total Item Price'
  }
});

BX.Collections.BoxItem.attachSchema(BX.Schemas.BoxItem);
