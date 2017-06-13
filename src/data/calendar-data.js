let today = new Date();
let year = today.getFullYear();
const IS_IT_LEAP_YEAR = (year - 2016) % 4 === 0

const CALENDAR_INFO = [
  {
    name: 'January',
    days: 31
  },{
    name: 'February',
    days: IS_IT_LEAP_YEAR ? 29 : 28
  },{
    name: 'March',
    days: 31
  },{
    name: 'April',
    days: 30
  },{
    name: 'May',
    days: 31
  },{
    name: 'June',
    days: 30
  },{
    name: 'July',
    days: 31
  },{
    name: 'August',
    days: 31
  },{
    name: 'September',
    days: 30
  },{
    name: 'October',
    days: 31
  },{
    name: 'November',
    days: 30
  },{
    name: 'December',
    days: 31
  }
];

module.exports = CALENDAR_INFO;
