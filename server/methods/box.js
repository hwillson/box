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

  }

});
