<template>
  <div>
    <UserBar />
    <Calendar></Calendar>
  </div>
</template>

<script>
import Calendar from "./Calendar.vue";
import UserBar from "../../components/user/UserBar.vue";

export default {
  name: "CalendarView",
  components: { Calendar, UserBar },
  mounted() {},
};
</script>
