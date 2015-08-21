BX.Model.BoxRenewalFrequency = {

  w2: {
    id: 'w2',
    label: 'Every 2 Weeks',
    calInterval: 2,
    calLabel: 'weeks'
  },

  m1: {
    id: 'm1',
    label: 'Every Month',
    calInterval: 1,
    calLabel: 'months'
  },

  m2: {
    id: 'm2',
    label: 'Every 2 Months',
    calInterval: 2,
    calLabel: 'months'
  },

  m3: {
    id: 'm3',
    label: 'Every 3 Months',
    calInterval: 3,
    calLabel: 'months'
  },

  renewalDateForFrequency: function (frequencyId) {
    var renewalDate, calInterval, calLabel;
    if (frequencyId) {
      calInterval = this[frequencyId].calInterval;
      calLabel = this[frequencyId].calLabel;
      renewalDate =
        BX.Utility.Date.newMomentWithDefaultTime().add(calInterval, calLabel);
    }
    return renewalDate;
  }

};
