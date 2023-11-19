import {
  createCurrentMonthDays,
  createFollowingMonthDays,
  createPreviousMonthDays
} from '@/utils';

export default {
  ADD_REMINDER(state, reminder) {
    const arr = state.reminders[reminder.day]
      ? state.reminders[reminder.day]
      : [];
    state.reminders = {
      ...state.reminders,
      ...{ [reminder.day]: [...arr, reminder] }
    };
  },
  REMOVE_REMINDER(state, reminder) {
    state.reminders[reminder.day] = [
      ...state.reminders[reminder.day].filter(
        (elem) => elem.timestamp !== reminder.timestamp
      )
    ];
  },
  REMOVE_ALL_REMINDER(state, day) {
    state.reminders[day] = [];
  },
  SET_REMINDER_TO_EDIT(state, reminder) {
    state.reminderToEdit = { ...reminder };
  },
  SET_EDIT_REMINDER_FLAG(state, flag) {
    state.editReminderFlag = flag;
  },
  SET_REMINDER_CITY_COORDENATES(state, coordsObj) {
    state.cityCoordenates = { ...coordsObj };
  },
  SET_CITY_WEATHER_DESCRIPTION(state, weatherObj) {
    state.cityWeatherDescription = { ...weatherObj };
  },
  SET_MONTH_SELECTED(state, selectedMonth) {
    state.selectedMonth = selectedMonth;
  },
  SET_DAYS(state) {
    const selectedMonth = state.selectedMonth.number;

    let daysArr = createCurrentMonthDays(selectedMonth);

    daysArr = createPreviousMonthDays(selectedMonth, daysArr);

    daysArr = createFollowingMonthDays(selectedMonth, daysArr);

    state.daysArray = [...daysArr];
  }
};
