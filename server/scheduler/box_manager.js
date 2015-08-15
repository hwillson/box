BoxManager = {

  createBoxRenewal: function (boxId) {
    var box, boxItems, customer, renewalData = {}, responseData, order;
    if (boxId) {

      box = BX.Collection.Boxes.findOne({ _id: boxId });
      customer = box.getCustomer();
      boxItems = box.getBoxItems();

      renewalData.boxId = boxId;
      renewalData.customerId = customer.externalId;
      renewalData.boxItems = boxItems;

      var response = HTTP.post(
        Meteor.settings.public.storeUrl + '/wp-admin/admin-ajax.php', {
          query: 'action=create_subscription_renewal_order',
          params: {
            renewalData: JSON.stringify(renewalData)
          }
        }
      );

      if (response) {
        responseData = response.data;
        if (responseData.success) {
          order = responseData.data;
          order.boxId = boxId;
          BX.Collection.BoxOrders.insert(order);
        } else {
          // Set to payment failed status and advance renewal date to tomorrow
          // (so payment for this box is tried again tomorrow).
          box.updateBoxStatus(BX.Model.BoxStatus.failed.id);
          box.setRenewalDateToTomorrow();
        }
      }

    }

  }

};
