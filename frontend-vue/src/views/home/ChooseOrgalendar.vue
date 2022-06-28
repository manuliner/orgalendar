<template>
  <div v-if="hasAlreadyOrgalendars">
    Du hast bereits schon Orgalendar. Wähle einen bestehenden oder erstelle
    einen neuen.
    <v-chip-group
      active-class="primary--text"
      column
      @change="chooseOrgalendar"
    >
      <v-chip v-for="tag in existingOrgalendars" :key="tag.id">
        {{ tag.name }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  name: "ChooseOrgalendar",

  data() {
    return {
      existingOrgalendars: [],
    };
  },
  mounted() {
    this.$store.dispatch("getOrgaStorage").then(() => {
      this.existingOrgalendars = this.$store.getters.calendars;
    });
  },

  created() {},
  computed: {
    hasAlreadyOrgalendars() {
      return !(
        this.existingOrgalendars && // 👈 null and undefined check
        Object.keys(this.existingOrgalendars).length === 0 &&
        Object.getPrototypeOf(this.existingOrgalendars) === Object.prototype
      );
    },
  },
  methods: {
    chooseOrgalendar(item) {
      const chosenOrgalendar = Object.values(this.existingOrgalendars)[item];

      this.$router.push({
        name: "Calendar",
        params: { slug: chosenOrgalendar.slug },
      });
    },
  },
};
</script>
