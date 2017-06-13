let EVENT_INFO = [];

for (var i = 1; i <= 31; i++) {
  if (i === 2) {
    EVENT_INFO.push({
      startDate: 1497211200,    // June 11th, 2017, 3pm
      endDate: 1497222000,      // June 11th, 2017, 6pm
      title: 'Test Event',
      description: 'A really fun thing',
      location: 'Bennu Coffeeshop'
    });
  }
};

module.exports = EVENT_INFO;
