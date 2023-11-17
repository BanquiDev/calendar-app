import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reminders: {},
    daysArray: []
  },
  getters: {
    getDays(state) {
      return state.daysArray;
    },
    getReminders: (state) => (day) => {
      return state.reminders[day] || [];
    }
  },
  mutations: {
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
      console.log('removeAllReminders', day);
      state.reminders[day] = [];
    },
    setDays(state) {
      let day = 1;
      let dayArr = [];
      while (day < 31) {
        const date = day < 10 ? `2023-11-0${day}` : `2023-11-${day}`;
        dayArr.push({ date: date, isCurrentMonth: true });
        day++;
      }

      state.daysArray = dayArr;
    }
  },
  actions: {},
  modules: {}
});
