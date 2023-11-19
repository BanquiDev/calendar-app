<template>
  <div class="calendar">
    <div class="calendar-month-header">
      <AddReminderButton @click="addReminder" />

      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>
    <div class="indicator">{{ selectedDate.label }} 2023</div>

    <CalendarWeek />

    <ol class="days-grid">
      <CalendarDayItem
        v-for="day in days"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
        :is-current-month="day.isCurrentMonth"
      />
    </ol>
    <add-reminder-component
      :reminder-flag-prop="reminderModalFlag"
      @update="updateFlag"
    />
  </div>
</template>
<script>
import AddReminderButton from '@/components/AddReminderButton.vue';
import CalendarDateSelector from '@/components/CalendarDateSelector.vue';
import CalendarDayItem from '@/components/CalendarDayItem.vue';
import CalendarWeek from '@/components/CalendarWeek.vue';
import dayjs from 'dayjs';
import { mapGetters, mapMutations } from 'vuex';
import AddReminderComponent from './AddReminderComponent.vue';

export default {
  name: 'MonthlyCalendar',
  components: {
    AddReminderButton,
    CalendarDateSelector,
    CalendarWeek,
    CalendarDayItem,
    AddReminderComponent
  },
  data() {
    return {
      selectedDate: {},
      today: dayjs().format('YYYY-MM-DD'),
      reminderModalFlag: false
    };
  },
  computed: {
    ...mapGetters({
      getEditReminderFlag: 'getEditReminderFlag',
      days: 'getDays'
    })
  },
  watch: {
    getEditReminderFlag(newVal) {
      if (newVal) {
        this.addReminder();
      }
    }
  },
  methods: {
    ...mapMutations({
      setDays: 'SET_DAYS',
      setEditReminderFlag: 'SET_EDIT_REMINDER_FLAG'
    }),
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    addReminder() {
      this.reminderModalFlag = true;
    },
    updateFlag() {
      this.reminderModalFlag = false;
      this.setEditReminderFlag(false);
    }
  }
};
</script>

<style scoped>
.calendar-month {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.days-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}
.indicator {
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-00);
}
</style>
