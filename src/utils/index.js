const getDaysLimit = (month) => {
  if (month === 2) return 28;
  if ([4, 6, 9, 11].indexOf(month) !== -1) {
    return 30;
  }
  return 31;
};
const createCurrentMonthDays = (selectedMonth) => {
  let day = 1;
  let daysArr = [];
  const daysLimit = getDaysLimit(selectedMonth);

  while (day <= daysLimit) {
    const date =
      day < 10
        ? `2023-${selectedMonth}-0${day}`
        : `2023-${selectedMonth}-${day}`;
    daysArr.push({ date: date, isCurrentMonth: true });
    day++;
  }
  return daysArr;
};
const createPreviousMonthDays = (selectedMonth, daysArr) => {
  const firstDayOfMonth = new Date(`${selectedMonth}/01/2023`);
  const firstDayWeekPosition = firstDayOfMonth.getDay();

  if (firstDayWeekPosition > 0) {
    const previousMonthLimit = getDaysLimit(selectedMonth - 1);
    for (let index = 0; index < firstDayWeekPosition; index++) {
      daysArr.unshift({
        date: `2023-${previousMonthLimit}-${previousMonthLimit - index}`,
        isCurrentMonth: false
      });
    }
  }
  return daysArr;
};
const createFollowingMonthDays = (selectedMonth, daysArr) => {
  if (daysArr.length % 7 !== 0) {
    const nextMonthDaysLimit = 35 - daysArr.length < 0 ? 42 : 35;
    let counter = 1;
    const nextMonth = selectedMonth + 1;
    for (let index = daysArr.length; index < nextMonthDaysLimit; index++) {
      daysArr.push({
        date: `2023-${nextMonth}-0${counter++}`,
        isCurrentMonth: false
      });
    }
  }
  return daysArr;
};
export {
  createCurrentMonthDays,
  createFollowingMonthDays,
  createPreviousMonthDays,
  getDaysLimit
};
