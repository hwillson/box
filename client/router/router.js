FlowRouter.route('/');

FlowRouter.route('/my-box', {
  action: function (params, queryParams) {
    if (queryParams && queryParams.id) {
      BX.Session.set('boxId', queryParams.id);
      BlazeLayout.render('commonLayout', { main: 'box' });
    }
  }
});
