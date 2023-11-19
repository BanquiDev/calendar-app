import AddReminderComponent from '@/components/AddReminderComponent.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Vuex from 'vuex';
const localVue = createLocalVue();
localVue.use(Vuex);

const reminderTest = {
  city: 'Buenos Aires',
  day: '2023-11-20',
  timestamp: 1700352458550,
  text: 'Reminder Test',
  weather: {
    description: 'Clear'
  }
};
const weatherDescription = {
  main: 'Clear',
  description: 'Clear Sky',
  id: 100,
  icon: ''
};
describe('AddReminderComponent.vue', () => {
  let getters;
  let mutations;
  let actions;
  let store;
  let wrapper;
  beforeEach(() => {
    getters = {
      getReminderToEdit: () => reminderTest,
      cityWeatherDescription: () => weatherDescription
    };
    mutations = {
      getCityCoordenates: jest.fn()
    };
    actions = {
      ADD_REMINDER: jest.fn()
    };
    store = new Vuex.Store({
      getters,
      mutations,
      actions
    });
    wrapper = shallowMount(AddReminderComponent, {
      propsData: { reminderFlagProp: true },
      store,
      localVue
    });
  });
  it('renders component', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('Creates new Reminder', () => {
    // const buttonWrapper = wrapper.find({ ref: 'save-button' });
    // buttonWrapper.trigger('click');
  });
});
