FlowRouter.route('/');

FlowRouter.route('/my-box', {
  action: function (params, queryParams) {
    BlazeLayout.render('commonLayout', { main: 'box' });
  }
});
