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
    name: 'AddUser',
    props: {
      takenNames: {
        type: Array,
        default: function () {
          return ['']
        },
      },
    },
    data () {
      return {
        valid: false,
        userName: '',
        userNameAvailable: true,
        userNameRules: [
          v => !!v || 'Du brauchst einen Namen!',
          v => v.length <= 10 || 'Dein Name sollte nicht mehr als 10 Buchstaben haben!',
          v => !!v && this.userNameAvailable|| 'Dieser Name ist bereits vergeben! Wähle doch bitte einen anderen.',
        ],
        email: '',
        emailRules: [(value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Ungültige E-mail";
      },],
      }
    },
    watch: {
      valid: function (val) {
        this.$emit('OnValid', val, this.email, this.userNameAvailable)
      },
    },
    methods: {
      validUserName (userName) {
        const foundName = this.takenNames.filter(function (entry) {
          return entry === userName
        })
        this.nameAvailable = foundName.length === 0
      },
    },
  }
</script>
