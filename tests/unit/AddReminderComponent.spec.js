import AddReminderComponent from '@/components/AddReminderComponent.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
// import vuetify from 'vuetify';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
// localVue.use(vuetify);

const reminderTest = {
  city: 'Buenos Aires',
  date: '2023-11-20',

  text: 'Reminder Test',
  hour: '01'
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
      ADD_REMINDER: jest.fn()
    };
    actions = {
      getCityCoordenates: jest.fn()
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

  it('Creates new Reminder', async () => {
    const saveButton = wrapper.findComponent({ ref: 'save-button' });
    expect(saveButton.exists()).toBeTruthy();

    const reminderTextInput = wrapper.findComponent(
      '[test-id="reminder-text"]'
    );

    await wrapper.setData({ newReminder: reminderTest });
    // TODO: Properly include Vuetify plugin to test vuetify components.
    expect(reminderTextInput.exists()).toBeTruthy();
    expect(wrapper.vm.newReminder.text).toBe(reminderTest.text);
    expect(wrapper.vm.newReminder.city).toBe(reminderTest.city);
    expect(wrapper.vm.newReminder.date).toBe(reminderTest.date);
    expect(wrapper.vm.newReminder.hour).toBe(reminderTest.hour);
  });
});
