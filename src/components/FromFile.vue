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
        <v-file-input
          v-model="candidatesFile"
          placeholder="Clique aqui para inserir a planilha de candidatos"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" block @click="generatePdf">Gerar provas</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import generatePdf from "../services/generatePdf";
export default {
  data: () => ({
    candidatesFile: null,
  }),
  methods: {
    async generatePdf() {
      await generatePdf(
        "ahoy",
        {
          name: "Anderson",
          area: "hum",
          number: "123",
          place: "local",
        },
        1
      );
    },
  },
};
</script>
