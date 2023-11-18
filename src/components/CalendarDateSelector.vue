<template>
  <div class="calendar-date-selector">
    <span @click="selectPrevious">﹤</span>
    <span @click="selectCurrent">Today</span>
    <span @click="selectNext">﹥</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
const MONTHS = [
  { number: 1, label: 'January' },
  { number: 2, label: 'February' },
  { number: 3, label: 'March' },
  { number: 4, label: 'April' },
  { number: 5, label: 'May' },
  { number: 6, label: 'June' },
  { number: 7, label: 'July' },
  { number: 8, label: 'August' },
  { number: 9, label: 'September' },
  { number: 10, label: 'October' },
  { number: 11, label: 'November' },
  { number: 12, label: 'December' }
];
export default {
  name: 'CalendarDateSelector',

  props: {
    currentDate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedDate: {},
      currentMonth: null
    };
  },
  created() {
    this.currentMonth = new Date().getMonth() + 1;
    this.setMonth();
  },
  methods: {
    ...mapActions({
      setMonthSelectedAndUpdateDays: 'setMonthSelectedAndUpdateDays'
    }),
    selectPrevious() {
      this.setMonth(-1);
    },
    selectCurrent() {
      this.currentMonth = new Date().getMonth() + 1;
      this.setMonth();
    },
    setMonth(number = 0) {
      if (this.currentMonth <= 1 || this.currentMonth >= 12) {
        return;
      }
      this.currentMonth = this.currentMonth + number;
      this.selectedDate = MONTHS.find(
        (elem) => elem.number === this.currentMonth
      );
      this.$emit('dateSelected', this.selectedDate);
      // this.setMonthSelected(this.selectedDate);
      this.setMonthSelectedAndUpdateDays(this.selectedDate);
    },
    selectNext() {
      this.setMonth(1);
    }
  }
};
</script>
<style scoped>
.calendar-date-selector {
  display: flex;
  justify-content: space-between;
  width: 80px;
  color: var(--grey-800);
}

.calendar-date-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>
