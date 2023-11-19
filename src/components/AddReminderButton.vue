<template>
  <!-- <div class="indicator">{{ selectedMonth }} 2023</div> -->
  <div>
    <v-btn class="ma-2" @click="$emit('click')" plain outlined
      >Add Reminder <v-icon end>mdi-plus</v-icon></v-btn
    >
  </div>
</template>

<script>
export default {
  computed: {
    selectedMonth() {
      return this.selectedDate.label;
    }
  }
};
</script>

<style scoped>
.indicator {
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-00);
}
</style>
