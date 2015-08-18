BX.Collection.ProductVariations = new Mongo.Collection('product_variations');

BX.Schema.ProductVariations = new SimpleSchema({
  variationId: {
    type: Number,
    label: 'Variation ID'
  },
  name: {
    type: String,
    label: 'Variation Name'
  },
  productId: {
    type: Number,
    label: 'Parent Product ID'
  },
});

BX.Collection.ProductVariations.attachSchema(BX.Schema.ProductVariations);

BX.Collection.ProductVariations.findProductVariations = function (productId) {
  return BX.Collection.ProductVariations.find({ productId: productId });
};
