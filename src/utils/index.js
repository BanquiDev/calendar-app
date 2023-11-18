export const daysLimit = (month) => {
  //   console.log('util', month);
  if (month === 2) return 28;
  if ([4, 6, 9, 11].indexOf(month) !== -1) {
    return 30;
  }
  return 31;
};

// module.exports = { daysLimit };
// export default {
//   daysLimit
// };
