ProductSynch = {

  fetchProductVariations: function () {

    var response, products;

    response = HTTP.get(
      Meteor.settings.public.storeUrl + '/wp-admin/admin-ajax.php', {
        query: 'action=get_product_variations'
      }
    );

    if (response && response.data && response.data.data) {
      products = JSON.parse(response.data.data);
      products.forEach(function (product) {
        BX.Collection.ProductVariations.insert(product);
      });
    }

    console.log('Product variations have been synched.');

  }

};
