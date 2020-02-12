<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col cols="12">
        <v-img
          :src="require('@/assets/images/ptguy.png')"
          class="my-3"
          contain
          height="500"
        ></v-img>
      </v-col>
    </v-row>
    <v-row wrap>
      <v-col class="testclass" col="6" justify="center" align="center">
        <v-btn block rounded large color="primary">log in</v-btn>
      </v-col>
      <v-col class="testclass" col="6" justify="center" align="center">
        <v-btn block rounded large color="primary">register</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LandingPage"
};
</script>

<style lang="scss">
.testclass {
  border: 2px solid red;
}
</style>
