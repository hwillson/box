SyncedCron.add({
  name: 'Synch Product Variants',
  schedule: function (parser) {
    return parser.text('every 24 hours');
  },
  job: function () {
    ProductSynch.fetchProductVariations();
  }
});

Meteor.startup(function () {
  // Synch all product variations when the application starts, then schedule
  // for once a day.
  ProductSynch.fetchProductVariations();
  SyncedCron.start();
});
