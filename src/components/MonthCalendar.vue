<template>
  <div class="calendar">
    <div class="calendar-month-header">
      <CalendarDateIndicator
        :selected-date="selectedDate"
        class="calendar-month-header-selected-month"
      />
      <!-- Pagination -->
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>
    <div>
      <v-btn class="ma-2" @click="addReminder" plain outlined
        >Add Reminder <v-icon end>mdi-plus</v-icon></v-btn
      >
    </div>
    <!-- Calendar grid header -->
    <CalendarWeek />

    <!-- Calendar grid -->
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
import CalendarDateIndicator from '@/components/CalendarDateIndicator.vue';
import CalendarDateSelector from '@/components/CalendarDateSelector.vue';
import CalendarDayItem from '@/components/CalendarDayItem.vue';
import CalendarWeek from '@/components/CalendarWeek.vue';
import dayjs from 'dayjs';
import { mapGetters, mapMutations } from 'vuex';
import AddReminderComponent from './AddReminderComponent.vue';

export default {
  name: 'MonthlyCalendar',
  components: {
    CalendarDateIndicator,
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
  mounted() {
    // this.setDays();
  },
  methods: {
    ...mapMutations({ setDays: 'setDays' }),
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    addReminder() {
      this.reminderModalFlag = true;
    },
    updateFlag() {
      this.reminderModalFlag = false;
    }
  },
  computed: {
    ...mapGetters({ days: 'getDays' })
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
</style>
