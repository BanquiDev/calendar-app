<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog v-model="reminderModalFlag" persistent>
          <v-form v-model="isValid" ref="reminderForm">
            <v-card class="reminder-modal">
              <v-row>
                <v-card-title>Add Reminder:</v-card-title>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newReminder.text"
                    label="Add Reminder"
                    :rules="[rules.required, rules.maxLength]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Pick Date"
                    v-model="newReminder.date"
                    @focus="showPicker = true"
                    :rules="[rules.required]"
                    :disabled="isEditFlow"
                  ></v-text-field>
                  <v-dialog v-model="showPicker" v-if="showPicker" width="500">
                    <v-card>
                      <v-date-picker
                        input-mode="keyboard"
                        v-model="newReminder.date"
                        :rules="[rules.required]"
                      >
                        <v-btn @click="closePicker">ok</v-btn>
                      </v-date-picker>
                    </v-card>
                  </v-dialog>
                </v-col>
                <v-col cols="7">
                  <v-select
                    label="Pick Hour"
                    v-model="newReminder.hour"
                    :items="dayHours"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-select
                    label="Pick Color"
                    v-model="newReminder.color"
                    :items="reminderColors"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="newReminder.city"
                    label="City"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="4">
                  <v-btn @click="saveReminder" ref="save-button">Save</v-btn>
                </v-col>
                <v-col cols="6" sm="6" md="4">
                  <v-btn @click="closeReminderModal">Close</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
const HOURS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24'
];
const COLORS = [
  'blue',
  'green',
  'red',
  'yellow',
  'lightblue',
  'gray',
  'orange'
];
export default {
  props: {
    reminderFlagProp: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newReminder: {
        text: '',
        date: '',
        hour: '',
        color: '',
        city: ''
      },
      isValid: false,
      showPicker: false,
      rules: {
        required: (value) => !!value || 'Field is required',
        maxLength: (value) => value?.length <= 30 || 'Max 30 characters'
      },
      isEditFlow: false
    };
  },
  computed: {
    ...mapGetters({
      getReminderToEdit: 'getReminderToEdit',
      cityWeatherDescription: 'getCityWeatherDescription'
    }),
    reminderModalFlag() {
      return this.reminderFlagProp;
    },
    dayHours() {
      return HOURS;
    },
    reminderColors() {
      return COLORS;
    }
  },
  watch: {
    getReminderToEdit(newVal) {
      if (newVal) {
        const { text, city, day, color, timestamp } = newVal;
        const hour = new Date(timestamp).getHours();
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        this.newReminder = {
          text: text,
          date: day,
          hour: formattedHour,
          color: color,
          city: city
        };
        this.isEditFlow = true;
      }
    }
  },
  methods: {
    ...mapMutations({ addReminder: 'addReminder' }),
    ...mapActions({ getCityCoordenates: 'getCityCoordenates' }),
    closeReminderModal() {
      this.newReminder = {
        text: '',
        date: '',
        hour: '',
        color: '',
        city: ''
      };
      this.$emit('update');
    },
    async saveReminder() {
      if (!this.isValid) {
        this.$refs.reminderForm.validate();
        return;
      }
      const reminderDate = new Date(this.newReminder.date).setHours(
        parseInt(this.newReminder.hour)
      );

      await this.getCityCoordenates();
      const weatherDescription = this.cityWeatherDescription;

      const reminderToAdd = {
        text: this.newReminder.text,
        timestamp: reminderDate,
        day: this.newReminder.date,
        color: this.newReminder.color,
        city: this.newReminder.city,
        weather: weatherDescription
      };

      this.addReminder(reminderToAdd);
      this.$emit('update');
      this.newReminder = {
        text: '',
        date: '',
        hour: '',
        color: '',
        city: '',
        weather: {}
      };
    },
    closePicker() {
      this.showPicker = false;
    }
  }
};
</script>
<style scoped>
.reminder-modal {
  padding: 5%;
}
</style>
