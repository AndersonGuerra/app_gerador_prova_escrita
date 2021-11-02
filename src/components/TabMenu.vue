<template>
  <v-main>
    <v-tabs v-model="tab" fixed-tabs>
      <v-tab>Gerar a partir de uma planilha</v-tab>
      <v-tab>Gerar prova de um usuário</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item><from-file /></v-tab-item>
      <v-tab-item><manual /></v-tab-item>
    </v-tabs-items>
  </v-main>
</template>
<script>
import FromFile from "./FromFile.vue";
import Manual from "./Manual.vue";
export default {
  components: {
    FromFile,
    Manual,
  },
  data: () => ({
    tab: 0,
  }),
};
</script>