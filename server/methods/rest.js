Meteor.methods({

  api_CreateNewBox: function (boxData) {

    var boxId, startDate, renewalFrequencyId, renewalDate, box, boxItems,
        customerId, order;
    check(boxData, Object);

    boxItems = boxData.boxItems;
    if (boxItems) {

      customerId = Meteor.call('createCustomer', boxData.customer);

      if (boxData.box && boxData.box.renewalFrequencyId) {
        renewalFrequencyId = boxData.box.renewalFrequencyId;
      } else {
        renewalFrequencyId = BX.Model.BoxRenewalFrequency.m1.id;
      }

      if (boxData.box.migratedStartDate) {
        startDate = moment(boxData.box.migratedStartDate);
      } else {
        startDate = moment();
      }

      if (boxData.box.migratedRenewalDate) {
        renewalDate = BX.Utility.Date.newMomentWithDefaultTime(
          boxData.box.migratedRenewalDate
        );
        if (renewalDate.isBefore(moment())) {
          renewalDate =
            BX.Utility.Date.newMomentWithDefaultTime().add(1, 'days');
        }
      } else {
        renewalDate = BX.Model.BoxRenewalFrequency.renewalDateForFrequency(
          renewalFrequencyId
        );
      }

      box = {
        referenceId: incrementCounter('box_counter', 'boxReferenceId'),
        customerId: customerId,
        customerFirstName: boxData.customer.firstName,
        customerLastName: boxData.customer.lastName,
        customerEmail: boxData.customer.email,
        startDate: startDate.toDate(),
        renewalFrequencyId: renewalFrequencyId,
        renewalDate: renewalDate.toDate(),
        statusId: BX.Model.BoxStatus.active.id
      };
      boxId = BX.Collection.Boxes.insert(box);

      boxItems.forEach(function (boxItem) {
        boxItem.boxId = boxId;
        BX.Collection.BoxItems.insert(boxItem);
      });

      if (boxData.order) {
        order = boxData.order;
        order.boxId = boxId;
        BX.Collection.BoxOrders.insert(order);
      }

    }

    return boxId;

  },

  api_AddToBox: function (boxItem) {
    var boxItemId;
    check(boxItem, Object);
    boxItemId = BX.Collection.BoxItems.addBoxItem(boxItem);
    return boxItemId;
  },

  api_BoxRenewalDate: function (data) {
    var box, renewalDate;
    if (data && data.boxId) {
      check(data.boxId, String);
      box = BX.Collection.Boxes.findOne({ _id: data.boxId });
      if (box) {
        renewalDate = BX.Utility.Date.formatDate(box.renewalDate);
      }
    }
    return renewalDate;
  },

  api_BoxRenewalDayCount: function (data) {
    var box, renewalDays;
    if (data && data.boxId) {
      check(data.boxId, String);
      box = BX.Collection.Boxes.findOne({ _id: data.boxId });
      if (box) {
        renewalDays = moment(box.renewalDate).diff(moment(), 'days');
      }
    }
    return renewalDays;
  }

});

JsonRoutes.setResponseHeaders({
  'Cache-Control': 'no-store',
  'Pragma': 'no-cache',
  'Access-Control-Allow-Origin': Meteor.settings.public.storeUrl,
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
});
