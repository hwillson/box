BX.Model.BoxItem = {

  orderType: function () {
    return BX.Model.BoxOrderType[this.orderTypeId].label;
  },

  orderUrl: function () {
    return Meteor.settings.public.boxOrderUrl + this.orderId;
  },

  remove: function () {
    BX.Collection.BoxItems.remove({ _id: this._id });
  },

  totalPrice: function () {
    return this.productPrice * this.quantity;
  },

  totalDiscountedPrice: function () {
    return this.discountedPrice * this.quantity;
  },

  setQuantity: function (quantity) {
    BX.Collection.BoxItems.update(
      { _id: this._id },
      {
        $set: {
          quantity: quantity
        }
      }
    );
  }

};
