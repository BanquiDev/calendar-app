export default {
  getDays(state) {
    return state.daysArray;
  },
  getReminders: (state) => (day) => {
    return state.reminders[day] || [];
  },
  getReminderToEdit(state) {
    return state.reminderToEdit;
  },
  getEditReminderFlag(state) {
    return state.editReminderFlag;
  },
  getCityWeatherDescription(state) {
    return state.cityWeatherDescription;
  }
};
