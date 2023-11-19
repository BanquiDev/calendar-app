<template>
  <div class="calendar-date-selector">
    <span @click="selectPrevious">﹤</span>
    <span @click="selectCurrent">Today</span>
    <span @click="selectNext">﹥</span>
  </div>
</template>

<script>
import { MONTHS } from '@/utils/constants';
import { mapActions } from 'vuex';
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
