<template>
  <v-form v-model="valid">
    <v-row>
      <v-text-field
        v-model="userName"
        :rules="userNameRules"
        :counter="10"
        label="Name"
        required
        @input="validUserName"
      />
    </v-row>
    <v-row>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      />
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "AddUser",
  props: {
    takennames: {
      type: Array,
      default: function () {
        return [""];
      },
    },
  },
  data() {
    return {
      valid: false,
      userName: "",
      userNameAvailable: true,
      userNameRules: [
        (v) => !!v || "Du brauchst einen Namen!",
        (v) =>
          v.length <= 10 ||
          "Dein Name sollte nicht mehr als 10 Buchstaben haben!",
        (v) =>
          (!!v && this.validUserName(v)) ||
          "Dieser Name ist bereits vergeben! Wähle doch bitte einen anderen.",
      ],
      email: "",
      emailRules: [
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Ungültige E-mail";
        },
      ],
    };
  },
  watch: {
    valid: function (val) {
      this.$emit("OnValid", val, this.email, this.userName);
    },
  },
  methods: {
    validUserName(userName) {
      const foundName = this.takennames.filter((entry) => {
        return entry === userName;
      });
      return foundName.length === 0;
    },
  },
};
</script>
