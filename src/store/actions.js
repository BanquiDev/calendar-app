import axios from 'axios';

const WEATHER_API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/';

export default {
  setMonthSelectedAndUpdateDays({ commit }, monthSelected) {
    commit('setMonthSelected', monthSelected);
    commit('setDays');
  },
  async getCityCoordenates({ commit, dispatch }) {
    console.log('getCityCoordenates', axios);
    try {
      const response = await axios.get(
        `${BASE_URL}geo/1.0/direct?q=buenos aires&appid=${WEATHER_API_KEY}`
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
        `${BASE_URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      );
      const weatherDescription = response.data.weather[0];
      commit('setCityWeatherDescription', weatherDescription);
    } catch (error) {
      alert(error.message);
    }
  }
};
