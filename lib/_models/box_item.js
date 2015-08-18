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
    var totalPrice = 0, productPrice = this.productPrice;
    if (this.discountPercent) {
      productPrice =
        +((productPrice * ((100 - this.discountPercent) / 100)).toFixed(2));
    }
    return productPrice * this.quantity;
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
  },

  /**
   * Returns the total discounted price of the box item (dicounted price *
   * quantity); if no discount is available will return the total norma price
   * of the box item.
   *
   * @return {Number} Total price (price * quantity); returns discounted first,
   *                  falling back on regular price.
   */
  totalCurrentPrice: function () {
    var totalCurrentPrice, totalDiscountedPrice;
    totalDiscountedPrice = this.totalDiscountedPrice();
    if (totalDiscountedPrice) {
      totalCurrentPrice = totalDiscountedPrice;
    } else {
      totalCurrentPrice = this.totalPrice();
    }
    return totalCurrentPrice;
  },

  updateVariationId: function (variationId) {
    if (variationId && (variationId !== this.variationId)) {
      BX.Collection.BoxItems.update(
        { _id: this._id },
        {
          $set: {
            variationId: variationId
          }
        }
      );
    }
  }

};
