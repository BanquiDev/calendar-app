import * as utils from '@/utils';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reminders: {},
    daysArray: [],
    selectedMonth: { number: null, label: '' }
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
      state.reminders[day] = [];
    },
    setMonthSelected(state, selectedMonth) {
      state.selectedMonth = selectedMonth;
    },
    setDays(state) {
      let day = 1;
      let dayArr = [];

      const selectedMonth = state.selectedMonth.number;
      const firstDayOfMonth = new Date(`${selectedMonth}/01/2023`);
      const daysLimit = utils.daysLimit(selectedMonth);

      while (day <= daysLimit) {
        const date =
          day < 10
            ? `2023-${selectedMonth}-0${day}`
            : `2023-${selectedMonth}-${day}`;
        dayArr.push({ date: date, isCurrentMonth: true });
        day++;
      }

      const firstDayWeekPosition = firstDayOfMonth.getDay();

      if (firstDayWeekPosition > 0) {
        const previousMonthLimit = utils.daysLimit(
          state.selectedMonth.number - 1
        );
        for (let index = 0; index < firstDayWeekPosition; index++) {
          dayArr.unshift({
            date: `2023-${previousMonthLimit}-${previousMonthLimit - index}`,
            isCurrentMonth: false
          });
        }
      }
      if (dayArr.length % 7 !== 0) {
        const nextMonthDaysLimit = 35 - dayArr.length < 0 ? 42 : 35;
        let counter = 1;
        const nextMonth = state.selectedMonth.number + 1;
        for (let index = dayArr.length; index < nextMonthDaysLimit; index++) {
          dayArr.push({
            date: `2023-${nextMonth}-0${counter++}`,
            isCurrentMonth: false
          });
        }
      }
      state.daysArray = [...dayArr];
    }
  },
  actions: {
    setMonthSelectedAndUpdateDays({ commit }, monthSelected) {
      commit('setMonthSelected', monthSelected);
      commit('setDays');
    }
  },
  modules: {}
  // strict: daysLimit
});
