<template>
  <div class="reminder-div" :style="{ backgroundColor: reminder.color }">
    <div class="reminder">
      <span>{{ reminder.text.toUpperCase() }}</span>
      <v-btn x-small plain @click="$emit('click:edit', reminder)" class="pr-0"
        ><v-icon small>mdi-pencil</v-icon></v-btn
      >
    </div>
    <div class="reminder-city">
      <span>City: {{ reminder.city }}</span>
    </div>
    <div class="reminder">
      <span>Conditions: {{ reminder.weather?.description || 'N/A' }}</span>
      <v-btn
        x-small
        plain
        @click="$emit('click:delete', reminder)"
        class="mt-2 mr-0 pr-0"
        ><v-icon small>mdi-delete-outline</v-icon></v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    reminder: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped>
.reminder-div {
  padding: 1%;
  font-size: 10px;
  color: white;
  text-align: left;
  margin-bottom: 2px;
  border-radius: 5px;
}
.reminder {
  display: flex;
  justify-content: space-between;
}
.reminder > span {
  overflow-x: hidden;
  width: 7rem;
  text-overflow: ellipsis;
}
.reminder-city {
  display: flex;
}
.reminder-city > span {
  overflow-x: hidden;

  width: 7rem;
  text-overflow: ellipsis;
}
</style>
