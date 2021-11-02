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
        <v-text-field v-model="process" label="Concurso"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="date" label="Data"></v-text-field>
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
        <v-file-input
          v-model="ensalamentoFile"
          placeholder="Clique aqui para inserir a planilha de ensalamento"
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
import sortArray from "sort-array";
import xlsx from "xlsx";
// import generatePdf from "../services/generatePdf";
export default {
  data: () => ({
    process: "",
    date: "",
    candidatesFile: null,
    ensalamentoFile: null,
    candidates: null,
    ensalamento: null,
  }),
  methods: {
    async generatePdf() {
      const reader1 = new FileReader();
      const reader2 = new FileReader();
      reader1.onload = () => {
        const workbook = xlsx.read(reader1.result);
        const sheet = workbook.SheetNames[0];
        let sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {});
        sheetJson = sortArray(sheetJson, {
          by: ["AREA", "NOME DO CANDIDATO"],
        });
        this.candidates = sheetJson;
      };
      reader2.onload = () => {
        const workbook = xlsx.read(reader2.result);
        const sheet = workbook.SheetNames[0];
        let sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {});
        this.ensalamento = sheetJson;
      };
      reader1.readAsArrayBuffer(this.candidatesFile);
      reader2.readAsArrayBuffer(this.ensalamentoFile);
    },
  },
};
</script>
