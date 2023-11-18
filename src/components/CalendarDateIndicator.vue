<template>
  <div class="indicator">{{ selectedMonth }} 2023</div>
</template>

<script>
export default {
  props: {
    selectedDate: {
      type: Object,
      required: true
    }
  },
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
