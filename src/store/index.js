import * as utils from '@/utils';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reminders: {},
    daysArray: [],
    selectedMonth: { number: null, label: '' },
    reminderToEdit: {},
    editReminderFlag: false,
    cityCoordenates: {
      lat: null,
      lon: null
    },
    cityWeatherDescription: {
      description: '',
      icon: '',
      id: null,
      main: ''
    }
  },
  getters: {
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

      let day = 1;
      let dayArr = [];
      const daysLimit = utils.daysLimit(selectedMonth);

      while (day <= daysLimit) {
        const date =
          day < 10
            ? `2023-${selectedMonth}-0${day}`
            : `2023-${selectedMonth}-${day}`;
        dayArr.push({ date: date, isCurrentMonth: true });
        day++;
      }

      const firstDayOfMonth = new Date(`${selectedMonth}/01/2023`);
      const firstDayWeekPosition = firstDayOfMonth.getDay();

      if (firstDayWeekPosition > 0) {
        const previousMonthLimit = utils.daysLimit(selectedMonth - 1);
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
    },
    // getCurrentWeather({dispatch},payload){

    // }
    async getCityCoordenates({ commit, dispatch }) {
      console.log('getCityCoordenates', axios);
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=buenos aires&appid=${WEATHER_API_KEY}`
        );
        const { lat, lon } = response.data[0];
        console.log('response::', lat, lon);
        commit('setReminderCityCoordenates', { lat, lon });
        await dispatch('getCityWeather');
      } catch (error) {
        alert(error.message);
      }
    },
    async getCityWeather({ state, commit }) {
      const { lat, lon } = state.cityCoordenates;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
        );
        const weatherDescription = response.data.weather[0];
        commit('setCityWeatherDescription', weatherDescription);
      } catch (error) {
        alert(error.message);
      }
    }
  },
  modules: {}
  // strict: daysLimit
});
const WEATHER_API_KEY = '3a83b80f42a8d8f94d9b2f4aa8f5a1aa';
