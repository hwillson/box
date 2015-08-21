BX.Collection.ProductVariations = new Mongo.Collection('product_variations');

BX.Schema.ProductVariations = new SimpleSchema({
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
    label: 'Product Image',
    optional: true
  },
  variationId: {
    type: Number,
    label: 'Variation ID',
    optional: true
  },
  variationName: {
    type: String,
    label: 'Variation Name',
    optional: true
  },
  variationPrice: {
    type: Number,
    label: 'Variation Price',
    decimal: true
  }
});

BX.Collection.ProductVariations.attachSchema(BX.Schema.ProductVariations);

BX.Collection.ProductVariations.findProductVariations = function (productId) {
  return BX.Collection.ProductVariations.find({ productId: productId });
};
