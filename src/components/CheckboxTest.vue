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
      <v-col>
        <v-text-field
          v-model="maxQuestions"
          label="Número de questões"
        ></v-text-field>
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
    <loading :loading="loading" />
  </v-container>
</template>
<script>
import jszip from "jszip";
import { saveAs } from "file-saver";
import generateCheckboxPdf from "../services/generateCheckboxPdf";
// import sortArray from "sort-array";
import xlsx from "xlsx";
import Loading from "./Loading.vue";
export default {
  components: {
    Loading,
  },
  data: () => ({
    loading: false,
    process: "Residência Multiprofissional em Saúde Coletiva 2022",
    date: "13/02/2022",
    maxQuestions: 40,
    fileCounter: 0,
    candidatesFile: null,
    candidates: null,
  }),
  watch: {
    fileCounter: async function (val) {
      if (val === 1) {
        this.fileCounter = 0;
      }
    },
  },
  methods: {
    async generatePdf() {
      this.loading = true;
      const reader1 = new FileReader();
      reader1.onload = async () => {
        const workbook = xlsx.read(reader1.result);
        const sheet = workbook.SheetNames[0];
        let sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {});
        this.candidates = sheetJson;
        const candidatesPerRoom = [];
        for (let i = 0; i < this.candidates.length; i++) {
          const candidate = this.candidates[i];
          const local = candidate["LOCAL"];
          if (candidatesPerRoom[local] !== undefined) {
            candidatesPerRoom[local].push(candidate);
          } else {
            candidatesPerRoom[local] = [];
            candidatesPerRoom[local].push(candidate);
          }
        }
        const rooms = Object.keys(candidatesPerRoom);
        const zip = new jszip();
        for (let i = 0; i < rooms.length; i++) {
          const room = rooms[i]
          const pdf = await generateCheckboxPdf(
            /*i,*/
            this.process,
            candidatesPerRoom[room],
            this.maxQuestions,
            this.date
          );
          zip.file(`provas coremu - ${room}.pdf`, pdf, { binary: true });
        }
        const zipFile = await zip.generateAsync({ type: "blob" });
        saveAs(zipFile, "lista.zip");
        this.loading = false;
      };
      reader1.readAsArrayBuffer(this.candidatesFile);
    },
  },
};
</script>
