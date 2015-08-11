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
      newRenewalDate = moment(renewalDate).hour(0).minute(0).second(1);
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
  }

};
