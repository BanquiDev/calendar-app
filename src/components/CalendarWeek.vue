<template>
  <ol class="day-of-week">
    <li v-for="weekday in weekdays" :key="weekday">
      {{ weekday }}
    </li>
  </ol>
</template>

<script>
import { WEEKDAYS } from '@/utils/constants';
import Vue from 'vue';
export default Vue.extend({
  name: 'CalendarWeekdays',

  computed: {
    weekdays() {
      return WEEKDAYS;
    }
  }
});
</script>
<style scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding-bottom: 0px !important;
  border-radius: 2px;
}
.day-of-week > * {
  text-align: center;
  padding-right: 5px;
  background-color: #87b5eb;
  color: white;
  font-weight: 500;
}
</style>
