Meteor.methods({

  createNewBox: function (boxData) {

    var boxId, startDate, box, boxItems, customerId;
    check(boxData, Object);

    boxItems = boxData.boxItems;
    if (boxItems) {

      customerId = Meteor.call('createCustomer', boxData.customer);

      startDate = moment();
      box = {
        customerId: customerId,
        startDate: startDate.toDate(),
        renewalDate: startDate.add(1, 'months').toDate(),
        statusId: BX.Models.BoxStatus.active
      };
      boxId = BX.Collections.Box.insert(box);

      boxItems.forEach(function (boxItem) {
        boxItem.boxId = boxId;
        BX.Collections.BoxItem.insert(boxItem);
      });

    }

    return boxId;

  }

});
