BX.Model.BoxOrder = {

  orderTypeLabel: function () {
    return BX.Model.BoxOrderType[this.orderTypeId].label;
  },

  orderUrl: function () {
    return Meteor.settings.public.boxOrderUrl + this.orderId;
  }

};
