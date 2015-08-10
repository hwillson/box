FlowRouter.route('/');

FlowRouter.route('/my-box', {
  action: function (params, queryParams) {
    if (queryParams && queryParams.id) {
      BX.Session.set('boxId', queryParams.id);
      BlazeLayout.render('customerLayout', { main: 'box' });
    }
  }
});

FlowRouter.route('/admin/box', {
  action: function (params, queryParams) {
    if (queryParams && queryParams.id) {
      BX.Session.set('boxId', queryParams.id);
      BlazeLayout.render('adminLayout', { main: 'adminBox' });
    }
  }
});

FlowRouter.route('/admin/boxes', {
  action: function (params, queryParams) {
    BlazeLayout.render('adminLayout', { main: 'adminBoxes' });
  }
});
