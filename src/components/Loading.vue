<template>
  <v-dialog v-model="loading" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Por favor aguarde um momento.
      </v-card-title>

      <v-card-text>
        Gerando lista de provas...
        <v-progress-linear height="16" indeterminate></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["loading"],
};
</script>