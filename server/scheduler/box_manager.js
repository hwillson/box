BoxManager = {

  renewBoxes: function () {
    var date, boxes, boxCount = 0;
    date = moment().toDate();
    boxes = BX.Collection.Boxes.find({
      renewalDate: {
        $lte: date
      }
    });
    boxCount = boxes.count();
    boxes.forEach(_.bind(function (box) {
      this.createBoxRenewal(box._id);
    }, this));
    return boxCount;
  },

  createBoxRenewal: function (boxId) {

    var box, boxItems = [], customer, renewalData = {}, responseData, order,
        currentRenewalDate, nextRenewalDate, auth;

    if (boxId) {

      box = BX.Collection.Boxes.findOne({ _id: boxId });
      customer = box.getCustomer();
      box.getBoxItems().forEach(function (boxItem) {
        boxItems.push({
          productId: boxItem.productId,
          variationId: boxItem.variationId,
          quantity: boxItem.quantity,
          discountPercent: boxItem.discountPercent
        });
      });

      renewalData.boxId = boxId;
      renewalData.customerId = customer.externalId;
      renewalData.boxItems = boxItems;

      var response = HTTP.post(
        Meteor.settings.public.storeUrl + '/wp-admin/admin-ajax.php', {
          headers: {
            authorization: this.basicAuthHeader()
          },
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
          // Increase next renewal date by renewal frequency.
          box.resetRenewalDate();
          // Make sure status is set to active
          box.updateBoxStatus(BX.Model.BoxStatus.active.id);
        } else {
          // Set to payment failed status and advance renewal date to tomorrow
          // (so payment for this box is tried again tomorrow).
          box.updateBoxStatus(BX.Model.BoxStatus.failed.id);
          box.setRenewalDateToTomorrow();
        }
      }

    }

  },

  cancelBox: function (boxId) {

    var box, customer, response, boxCancelled = false;

    box = BX.Collection.Boxes.findOne({ _id: boxId });
    customer = box.getCustomer();

    if (box) {

      response = HTTP.get(
        Meteor.settings.public.storeUrl + '/wp-admin/admin-ajax.php', {
          headers: {
            authorization: this.basicAuthHeader()
          },
          query: 'action=cancel_box&user_id=' + customer.externalId
        }
      );

      if (response && response.data && response.data.success) {
        box.updateBoxStatus(BX.Model.BoxStatus.cancelled.id);
        boxCancelled = true;
      }

    }

    return boxCancelled;

  },

  basicAuthHeader: function () {
    return 'Basic ' + Base64.encode(
      Meteor.settings.private.tfAuthUser + ':'
      + Meteor.settings.private.tfAuthPass
    );
  }

};
