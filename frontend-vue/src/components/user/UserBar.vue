<template>
  <section id="UserChooser">
    <v-sheet class="pt-5">
      <v-container>
        <v-row v-if="selectedUsername !== ''">
          <v-col cols="1"> Du bist </v-col>
          <v-col cols="2">
            <v-select
              v-model="selectedUsername"
              :items="userNames"
              label="Name"
              @change="onUserchoose"
            >
              <template #append-item>
                <v-list-item>
                  <v-btn icon @click="openDialog">
                    <v-icon> mdi-plus </v-icon>
                  </v-btn>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row v-if="selectedUsername === ''">
          <v-col>
            <v-chip-group
              v-if="selectedUsername === ''"
              active-class="primary--text"
              column
              @change="onUserchooseByNumber"
            >
              <v-chip v-for="tag in users" :key="tag.name">
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <add-user-dialog ref="addUserDialogUserBar" @addUser="addUser" />
      </v-container>
    </v-sheet>
  </section>
</template>

<script>
import AddUserDialog from "./AddUserDialog.vue";
import UserService from "../../services/user.service";
import { isEmptyObject } from "../../helpers/common.helper";

export default {
  name: "UserChooser",

  components: { AddUserDialog },
  data: () => ({
    selectedUsername: "",
    userNames: [],
    users: [],
    valid: false,
  }),
  created() {
    UserService.getUsersBySlug(this.$route.params.slug)
      .then((response) => {
        const payload = response.data;
        this.users = payload.data;
        this.userNames = this.users.map((element) => {
          return element.name;
        });
      })
      .catch((e) => {
        this.$log.error(e);
      });
    this.$store.dispatch("getUser", this.$route.params.slug).then((data) => {
      if (data) {
        this.selectedUsername = data.name;
      }
    });
  },

  methods: {
    addUser(newUser) {
      this.users.push(newUser);
      this.userNames.push(newUser.name);
    },
    openDialog() {
      this.$refs.addUserDialogUserBar.open(this.userNames);
    },
    onUserchooseByNumber(idx) {
      let user = this.users[idx];
      this.selectedUsername = user.name;
      user.slug = this.$route.params.slug;
      this.$store.dispatch("setUser", user);
    },
    onUserchoose(val) {
      const needle = this.users.find((element) => element.name === val);
      if (!isEmptyObject(needle)) {
        this.selectedUsername = needle.name;
        needle.slug = this.$route.params.slug;
        this.$store.dispatch("setUser", needle);
      }
    },
    fetchAllUser() {
      //   const calendar = this.$store.getters.calendar;
    },
  },
};
</script>
