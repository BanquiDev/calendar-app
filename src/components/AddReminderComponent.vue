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
                <v-col cols="6">
                  <v-btn
                    @click="saveReminder"
                    ref="save-button"
                    color="green"
                    class="buttons"
                    >Save
                    <v-icon class="ml-2" small>mdi-check-outline</v-icon></v-btn
                  >
                </v-col>
                <v-col cols="6" sm="6" md="4">
                  <v-btn @click="closeReminderModal" color="red" class="buttons"
                    >Close <v-icon class="ml-2">mdi-close</v-icon></v-btn
                  >
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
import { COLORS, HOURS } from '@/utils/constants';
import { mapActions, mapGetters, mapMutations } from 'vuex';

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
    ...mapMutations({ addReminder: 'ADD_REMINDER' }),
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
.buttons {
  color: white;
  font-weight: 600;
}
</style>
