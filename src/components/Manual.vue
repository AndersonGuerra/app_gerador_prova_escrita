<template>
  <v-container>
    <v-row>
      <v-col>
        A planilha de condidatos deve possuir a seguintes colunas:
        <strong>AREA, NÚMERO DE INSCRIÇÃO e NOME</strong>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="candidate.name"
          label="Nome do candidato"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="candidate.number"
          label="Número de inscrição"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="candidate.area" label="Área"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="candidate.place" label="Local"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="process" label="Concurso"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="date" label="Data"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" block @click="generatePdf">Gerar prova</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import generatePdf from "../services/generatePdf";
export default {
  data: () => ({
    process: "",
    candidate: {},
    date: "",
  }),
  methods: {
    async generatePdf() {
      await generatePdf(true, this.process, this.candidate, 1);
    },
  },
};
</script>
