Template.registerHelper('formatDate', function (date) {
  return BX.Utility.Date.formatDate(date);
});

Template.registerHelper('formatDateTime', function (date) {
  return BX.Utility.Date.formatDateTime(date);
});
