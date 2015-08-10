BX.Collection.BoxOrder = new Mongo.Collection('box_orders');

BX.Schema.BoxOrder = new SimpleSchema({
  boxId: {
    type: String,
    label: 'Box ID'
  },
  orderTypeId: {
    type: String,
    label: 'Order Type ID'
  },
  orderDate: {
    type: Date,
    label: 'Order Date'
  },
  orderId: {
    type: Number,
    label: 'Order ID'
  }
});

BX.Collection.BoxOrder.attachSchema(BX.Schema.BoxOrder);

BX.Collection.BoxOrder.helpers({

  orderType: function () {
    return BX.Model.BoxOrderType[this.orderTypeId].label;
  }

});
