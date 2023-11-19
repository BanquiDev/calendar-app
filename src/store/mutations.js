import {
  createCurrentMonthDays,
  createFollowingMonthDays,
  createPreviousMonthDays
} from '@/utils';

export default {
  addReminder(state, reminder) {
    const arr = state.reminders[reminder.day]
      ? state.reminders[reminder.day]
      : [];
    state.reminders = {
      ...state.reminders,
      ...{ [reminder.day]: [...arr, reminder] }
    };
  },
  removeReminder(state, reminder) {
    state.reminders[reminder.day] = [
      ...state.reminders[reminder.day].filter(
        (elem) => elem.timestamp !== reminder.timestamp
      )
    ];
  },
  removeAllReminders(state, day) {
    state.reminders[day] = [];
  },
  setReminderToEdit(state, reminder) {
    state.reminderToEdit = { ...reminder };
  },
  setEditReminderFlag(state, flag) {
    state.editReminderFlag = flag;
  },
  setReminderCityCoordenates(state, coordsObj) {
    state.cityCoordenates = { ...coordsObj };
  },
  setCityWeatherDescription(state, weatherObj) {
    state.cityWeatherDescription = { ...weatherObj };
  },
  setMonthSelected(state, selectedMonth) {
    state.selectedMonth = selectedMonth;
  },
  setDays(state) {
    const selectedMonth = state.selectedMonth.number;

    let daysArr = createCurrentMonthDays(selectedMonth);

    daysArr = createPreviousMonthDays(selectedMonth, daysArr);

    daysArr = createFollowingMonthDays(selectedMonth, daysArr);

    state.daysArray = [...daysArr];
  }
};
