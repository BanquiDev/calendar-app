<template>
  <div class="reminder-div" :style="{ backgroundColor: reminder.color }">
    <div class="reminder">
      <span>{{ reminder.text }}</span>
      <v-btn x-small plain @click="$emit('click:delete', reminder)"
        ><v-icon small>mdi-delete-outline</v-icon></v-btn
      >
    </div>
    <div class="reminder-city">
      <span>City: {{ reminder.city }}</span>
      <v-btn x-small plain @click="$emit('click:edit', reminder)"
        ><v-icon small>mdi-pencil</v-icon></v-btn
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
  width: 3.5rem;
  text-overflow: ellipsis;
}
.reminder-city {
  display: flex;
  /* height: 20px; */
}
.reminder-city > span {
  overflow-x: hidden;

  width: 100px;
  text-overflow: ellipsis;
}
</style>
