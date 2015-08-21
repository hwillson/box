BX.Utility.Date = {

  formatDate: function (date) {
    return moment(date).format('YYYY-MM-DD');
  },

  formatDateTime: function (date) {
    return moment(date).format('YYYY-MM-DD hh:mm:ss A');
  },

  /**
   * Sets default time to be 8 AM (UTC).
   *
   * @param   {Date}    date  Date to convert to moment; will use current date
   *                          if none is provided.
   * @return  {Object}        Moment object with specified time.
   */
  newMomentWithDefaultTime: function (date) {
    var newMoment;
    if (date) {
      newMoment = moment(date);
    } else {
      newMoment = moment();
    }
    return newMoment.hour(8).minute(0).second(0);
  }

}
