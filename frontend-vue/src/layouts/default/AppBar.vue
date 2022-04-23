<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      elevation="1"
      elevate-on-scroll
      height="80"
      color="secondary"
    >
      <base-img
        :src="require(`@/assets/logo.png`)"
        class="mr-3 hidden-xs-only filter-accent2"
        contain
        max-width="46"
        width="100%"
        @click="toStart"
      />
      <base-heading title="ORGALENDAR" />
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HomeAppBar",
  data: () => ({}),
  computed: {
    isNotHome() {
      return this.$route.name !== "Start";
    },
    showLogoutBtn() {
      return this.loggedIn && this.isNotHome;
    },
  },
  mounted() {
    this.$log.debug("getLocalStorage");
    this.$store.dispatch("getLocalStorage");
  },
  methods: {
    toStart() {
      const path = "/";
      if (this.$route.path !== path) this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.filter-accent2 {
  filter: invert(10%) sepia(98%) saturate(7351%) hue-rotate(294deg)
    brightness(71%) contrast(106%);
}
</style>
