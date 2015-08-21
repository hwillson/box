SyncedCron.add({
  name: 'Synch product variations',
  schedule: function (parser) {
    // Fetch products at 7 AM UTC, so 1 AM when MDT (UTC-6) or 12 am when MST
    // (UTC-7)
    return parser.text('at 8:00 am');
  },
  job: function () {
    ProductSynch.fetchProductVariations();
  }
});

SyncedCron.add({
  name: 'Create box order renewals',
  schedule: function (parser) {
    // Start creating box renewals at 9 AM UTC, so 3 AM when MDT (UTC-6) or
    // 2 am when MST (UTC-7)
    return parser.text('at 9:00 am');
  },
  job: function () {
    var boxesRenewed = BoxManager.renewBoxes();
    return 'Total boxes renewed: ' + boxesRenewed;
  }
});

Meteor.startup(function () {
  // Synch all product variations when the application starts.
  ProductSynch.fetchProductVariations();
  SyncedCron.start();
});
