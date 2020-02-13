<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card width="400px" class="mx-auto mt-5">
          <v-form @submit.prevent="login">
            <v-card-text>
              <v-text-field
                label="Email"
                v-model="form.email"
                prepend-icon="mdi-account-circle"
                id="email"
                type="text"
              />
              <v-text-field
                label="Password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn type="submit" color="info">Log In</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "LoginPage",
  data() {
    return {
      showPassword: false,
      form: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("signInWithEmailAndPassword", {
          email: this.form.email,
          password: this.form.password
        })
        .then(() => this.$router.push("/dashboard")).catch(error => alert(error.message));
    }
  }
};
</script>