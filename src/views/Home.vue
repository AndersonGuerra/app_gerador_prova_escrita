<template>
  <v-app>
    <app-bar />
    <tab-menu />
  </v-app>
</template>
<script>
import AppBar from "../components/AppBar.vue";
import TabMenu from "../components/TabMenu.vue";
export default {
  components: {
    TabMenu,
    AppBar,
  },
  data: () => ({}),
};
</script>