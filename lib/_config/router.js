var storeToken = function (context) {
  if (!BX.Session.get('token')) {
    if (context.queryParams.token) {
      BX.Session.set('token', context.queryParams.token);
    } else {
      throw new Error('Missing auth token.');
    }
  }
};

FlowRouter.route('/');

FlowRouter.route('/box', {
  triggersEnter: [storeToken],
  action: function (params, queryParams) {
    BX.Session.set('boxId', queryParams.id);
    BlazeLayout.render('customerLayout', { main: 'box' });
  }
});

FlowRouter.route('/admin/box', {
  triggersEnter: [storeToken],
  action: function (params, queryParams) {
    BX.Session.set('boxId', queryParams.id);
    BlazeLayout.render('adminLayout', { main: 'adminBox' });
  }
});

FlowRouter.route('/admin/boxes', {
  triggersEnter: [storeToken],
  action: function (params, queryParams) {
    BlazeLayout.render('adminLayout', { main: 'adminBoxes' });
  }
});
