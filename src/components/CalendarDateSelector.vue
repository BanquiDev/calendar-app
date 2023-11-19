<template>
  <div class="month-selector">
    <span @click="selectPrevious"><v-icon large>mdi-chevron-left</v-icon></span>
    <span @click="selectCurrent">Current</span>
    <span @click="selectNext"><v-icon large>mdi-chevron-right</v-icon></span>
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
      const truncateMonthPagination =
        (this.currentMonth <= 1 && number === -1) ||
        (this.currentMonth >= 12 && number === 1);
      if (truncateMonthPagination) {
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
.month-selector {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: medium;
  color: var(--grey-800);
  align-items: center;
}

.month-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>
