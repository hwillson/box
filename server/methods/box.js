Meteor.methods({

  createNewBox: function (boxData) {

    var boxId, startDate, box, boxItems, customerId, response;
    check(boxData, Object);

    boxItems = boxData.boxItems;
    if (boxItems) {

      customerId = Meteor.call('createCustomer', boxData.customer);

      startDate = moment();
      box = {
        customerId: customerId,
        startDate: startDate.toDate(),
        renewalDate: startDate.add(1, 'months').toDate(),
        statusId: BX.Model.BoxStatus.active
      };
      boxId = BX.Collection.Box.insert(box);

      boxItems.forEach(function (boxItem) {
        boxItem.boxId = boxId;
        BX.Collection.BoxItem.insert(boxItem);
      });

    }

    return boxId;

  },

  addToBox: function (boxItem) {
    var boxItemId;
    check(boxItem, Object);

    JsonRoutes.setResponseHeaders({
      'Cache-Control': 'no-store',
      'Pragma': 'no-cache',
      'Access-Control-Allow-Origin': 'http://thefeed.octonary.com',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    });

    boxItemId = BX.Collection.BoxItem.insert(boxItem);
    return boxItemId;
  }

});
