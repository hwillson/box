BX.Model.Box = {

  customerName: function () {
    return this.customerFirstName + ' ' + this.customerLastName;
  },

  updateBoxStatus: function (statusId) {
    if (statusId) {
      BX.Collection.Boxes.update(
        { _id: this._id },
        {
          $set: {
            statusId: statusId
          }
        }
      );
    }
  },

  updateRenewalDate: function (renewalDate) {
    var newRenewalDate;
    if (renewalDate !== BX.Utility.Date.formatDate(this.renewalDate)) {
      newRenewalDate = moment(renewalDate).hour(12).minute(0).second(0);
      BX.Collection.Boxes.update(
        { _id: this._id },
        {
          $set: {
            renewalDate: newRenewalDate.toDate()
          }
        }
      );
    }
  },

  setRenewalDateToTomorrow: function () {
    var newRenewalDate =
      moment(this.renewalDate).add(1, 'days').hour(12).minute(0).second(0);
    BX.Collection.Boxes.update(
      { _id: this._id },
      {
        $set: {
          renewalDate: newRenewalDate.toDate()
        }
      }
    );
  },

  updateRenewalFrequency: function (frequencyId) {
    if (frequencyId) {
      BX.Collection.Boxes.update(
        { _id: this._id },
        {
          $set: {
            renewalFrequencyId: frequencyId
          }
        }
      );
    }
  },

  getBoxItems: function () {
    var boxItems = [];
    BX.Collection.BoxItems.find({ boxId: this._id }).forEach(function (item) {
      boxItems.push({
        productId: item.productId,
        variationId: item.variationId,
        quantity: item.quantity,
        price: item.totalCurrentPrice()
      })
    });
    return boxItems;
  },

  getCustomer: function () {
    return BX.Collection.Customers.findOne({ _id: this.customerId });
  }

};
