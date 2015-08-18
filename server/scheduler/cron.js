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
  SyncedCron.start();
});
