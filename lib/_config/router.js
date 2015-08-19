FlowRouter.route('/');

FlowRouter.route('/box', {
  action: function (params, queryParams) {
    BX.Session.set('boxId', queryParams.id);
    BlazeLayout.render('customerLayout', { main: 'box' });
  }
});

FlowRouter.route('/admin/box', {
  action: function (params, queryParams) {
    BX.Session.set('boxId', queryParams.id);
    BlazeLayout.render('adminLayout', { main: 'adminBox' });
  }
});

FlowRouter.route('/admin/boxes', {
  action: function (params, queryParams) {
    BlazeLayout.render('adminLayout', { main: 'adminBoxes' });
  }
});
