export const daysLimit = (month) => {
  //   console.log('util', month);
  if (month === 2) return 28;
  if ([4, 6, 9, 11].indexOf(month) !== -1) {
    return 30;
  }
  return 31;
};
// export const createCurrentMonthDays = (selectedMonth) => {
//   let day = 1;
//   let dayArr = [];
//   const daysLimit = daysLimit(selectedMonth);

//   while (day <= daysLimit) {
//     const date =
//       day < 10
//         ? `2023-${selectedMonth}-0${day}`
//         : `2023-${selectedMonth}-${day}`;
//     dayArr.push({ date: date, isCurrentMonth: true });
//     day++;
//   }
//   return dayArr;
// };
// module.exports = { daysLimit };
// export default {
//   daysLimit
// };
