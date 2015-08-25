Template.registerHelper('formatDate', function (date) {
  return BX.Utility.Date.formatDate(date);
});

Template.registerHelper('formatLongDate', function (date) {
  return BX.Utility.Date.formatLongDate(date);
});

Template.registerHelper('formatDateTime', function (date) {
  return BX.Utility.Date.formatDateTime(date);
});

Template.registerHelper('formatPrice', function (price) {
  return price.toFixed(2);
});

Template.registerHelper('setting', function (property) {
  if (property) {
    return Meteor.settings.public[property];
  }
});
