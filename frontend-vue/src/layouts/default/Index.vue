<template>
  <v-app>
    <home-app-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
import CalendarService from "../../services/calendar.service";
export default {
  name: "StartView",
  mounted() {
    this.$store.dispatch("getOrgaStorage");
    CalendarService.getCalendarBySlug(this.$route.params.slug)
      .then((response) => {
        this.$store.dispatch("addCalendar", response.data.data);
      })
      .catch((e) => {
        this.$log.error(e);
      });
  },
  components: {
    HomeAppBar: () => import("./AppBar"),
    HomeFooter: () => import("./Footer"),
    HomeView: () => import("./View"),
  },
};
</script>
