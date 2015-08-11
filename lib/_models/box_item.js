BX.Model.BoxItem = {

  orderType: function () {
    return BX.Model.BoxOrderType[this.orderTypeId].label;
  },

  orderUrl: function () {
    return Meteor.settings.public.boxOrderUrl + this.orderId;
  },

  remove: function () {
    BX.Collection.BoxItems.remove({ _id: this._id });
  }

};
