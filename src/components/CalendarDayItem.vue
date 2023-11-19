<template>
  <div>
    <li
      class="calendar-day"
      :class="{
        'calendar-day--not-current': !isCurrentMonth,
        'calendar-day--today': isToday
      }"
    >
      <div class="day-cell">
        <div class="cell-header">
          <span>{{ dayNumber }}</span>
          <v-btn
            v-if="reminders.length"
            x-small
            plain
            width="10"
            dense
            @click="deleteAllReminders"
            ><v-icon>mdi-delete-outline</v-icon></v-btn
          >
        </div>
        <div v-for="reminder in reminders" :key="reminder.timestamp">
          <reminder-component
            :reminder="reminder"
            @click:delete="deleteReminder"
            @click:edit="editReminder"
          />
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import ReminderComponent from '@/components/ReminderComponent.vue';
import dayjs from 'dayjs';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CalendarMonthDayItem',
  components: {
    ReminderComponent
  },
  props: {
    day: {
      type: Object,
      required: true
    },

    isCurrentMonth: {
      type: Boolean,
      default: false
    },

    isToday: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reminderModalFlag: false,
      reminderToEdit: {}
    };
  },

  computed: {
    ...mapGetters({ dayReminders: 'getReminders' }),
    dayNumber() {
      return dayjs(this.day.date).format('D');
    },
    reminders() {
      const sortedReminders = this.dayReminders(this.day.date).sort(
        (a, b) => a.timestamp - b.timestamp
      );
      return sortedReminders;
    }
  },

  methods: {
    ...mapMutations({
      removeReminder: 'REMOVE_REMINDER',
      removeAllReminders: 'REMOVE_ALL_REMINDER',
      setReminderToEdit: 'SET_REMINDER_TO_EDIT',
      setEditReminderFlag: 'SET_EDIT_REMINDER_FLAG'
    }),
    deleteReminder(reminder) {
      this.removeReminder(reminder);
    },
    deleteAllReminders() {
      this.removeAllReminders(this.day.date);
    },
    editReminder(reminder) {
      this.setEditReminderFlag(true);
      this.setReminderToEdit(reminder);
    }
  }
};
</script>
<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
  border: 1px var(--grey-800) solid;
  overflow-y: hidden;
}

.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 10px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  padding: 5px;
  background-color: var(--grey-800);
}
.reminder-modal > v-card {
  z-index: 1;
  /* padding:10%; */
}
.cell-header {
  display: flex;
  justify-content: space-between;
}
.day-cell {
  /* height: 80px; */
  height: 100px;
  overflow-y: auto;
}
::v-btn {
  min-width: none;
}
</style>
