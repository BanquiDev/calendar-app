import axios from 'axios';

const WEATHER_API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/';

export default {
  setMonthSelectedAndUpdateDays({ commit }, monthSelected) {
    commit('SET_MONTH_SELECTED', monthSelected);
    commit('SET_DAYS');
  },
  async getCityCoordenates({ commit, dispatch }) {
    try {
      const response = await axios.get(
        `${BASE_URL}geo/1.0/direct?q=buenos aires&appid=${WEATHER_API_KEY}`
      );
      const { lat, lon } = response.data[0];
      commit('SET_REMINDER_CITY_COORDENATES', { lat, lon });
      await dispatch('getCityWeather');
    } catch (error) {
      alert(error.message);
    }
  },
  async getCityWeather({ state, commit }) {
    const { lat, lon } = state.cityCoordenates;
    try {
      const response = await axios.get(
        `${BASE_URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      );
      const weatherDescription = response.data.weather[0];
      commit('SET_CITY_WEATHER_DESCRIPTION', weatherDescription);
    } catch (error) {
      alert(error.message);
    }
  }
};
