BX.Collection.BoxOrders = new Mongo.Collection('box_orders', {
  transform: function (doc) {
    var boxOrder = Object.create(doc);
    _.extend(boxOrder, BX.Model.BoxOrder);
    return boxOrder;
  }
});

BX.Schema.BoxOrders = new SimpleSchema({
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

BX.Collection.BoxOrders.attachSchema(BX.Schema.BoxOrders);
