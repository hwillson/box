BX.Utility.Date = {

  formatDate: function (date) {
    return moment(date).format('YYYY-MM-DD');
  },

  formatDateTime: function (date) {
    return moment(date).format('YYYY-MM-DD hh:mm:ss A');
  }

}
