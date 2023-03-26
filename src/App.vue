<template>
  <MainHeader />

  <div id="main-content">
    <v-container class="mt-16 rounded-xl bg-white" id="main-container">
      <router-view />
    </v-container>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "App",
  components: {
    MainHeader,
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  overflow-y: auto !important;
  background-color: #bbdefb;
}
#main-container {
  min-height: 60vh;
  margin-bottom: 100px;
}
</style>
