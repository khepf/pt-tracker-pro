<template>
  <v-app>
    <v-app-bar v-if="getRoute.name !== 'LandingPage'" app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn @click.prevent="$store.dispatch('signOut')">log out</v-btn>

      <v-btn text>
        <span v-if="getUser.email">Welcome, {{ getUser.email }}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),

  computed: {
    getRoute() {
      return this.$route;
    },
    getUser() {
      return this.$store.getters.authUser;
    }
  },
  created() {
    this.getRoute;
  }
};
</script>
