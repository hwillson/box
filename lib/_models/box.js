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
    if (renewalDate &&
        renewalDate !== BX.Utility.Date.formatDate(this.renewalDate)) {
      newRenewalDate =
        BX.Utility.Date.newMomentWithDefaultTime(renewalDate);
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
      BX.Utility.Date.newMomentWithDefaultTime(this.renewalDate).add(1, 'days');
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

  resetRenewalDate: function () {
    var nextRenewalDate = BX.Model.BoxRenewalFrequency.renewalDateForFrequency(
      this.renewalFrequencyId
    );
    this.updateRenewalDate(nextRenewalDate);
  },

  getBoxItems: function () {
    return BX.Collection.BoxItems.find({ boxId: this._id });
  },

  getCustomer: function () {
    return BX.Collection.Customers.findOne({ _id: this.customerId });
  },

  cancelBox: function () {
    Meteor.call('cancelBox', this._id, function (error, result) {
      console.log(error);
      console.log(result);
    });
  },

  boxSubtotal: function () {
    var boxItems = this.getBoxItems(), boxSubtotal = 0;
    boxItems.forEach(function (boxItem) {
      boxSubtotal += boxItem.totalCurrentPrice();
    });
    return boxSubtotal;
  },

  boxTotal: function () {
    var boxTotal = this.boxSubtotal();
    if (this.shippingCost) {
      boxTotal += this.shippingCost;
    }
    return boxTotal;
  }

};
