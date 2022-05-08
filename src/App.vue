<template>
  <v-app app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
html {
  height: 100vh !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}
</style>
