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
console.log('DBEUG: ' + this._id);
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

  boxPrice: function () {
    var boxItems = this.getBoxItems(), boxPrice = 0;
    boxItems.forEach(function (boxItem) {
      boxPrice += boxItem.totalCurrentPrice();
    });
    return boxPrice;
  }

};
