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
// import xlsx from "xlsx";
import Loading from "./Loading.vue";
import axios from "axios";

export default {
  components: {
    Loading,
  },
  data: () => ({
    loading: false,
    process: "Edital Nº 07/2022 - Técnico-Administrativo em Educação",
    date: "05/06/2022",
    maxQuestions: 60,
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
      // this.loading = true;
      // const reader1 = new FileReader();
      // reader1.onload = async () => {

      // const workbook = xlsx.read(reader1.result);
      // const sheet = workbook.SheetNames[0];
      // let sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {});
      let a = await axios.get(
        "http://localhost:3030/inscriptions?id_ps=624762dedb8badce57e19170&$populate=id_user"
      );
      a = a.data.filter((e) => e.accepted_isencao || e.is_paid);
      this.candidates = [...a];
      // const candidatesPerRoom = [];
      // for (let i = 0; i < this.candidates.length; i++) {
      //   const candidate = this.candidates[i];
      //   const local = candidate["LOCAL"];
      //   if (candidatesPerRoom[local] !== undefined) {
      //     candidatesPerRoom[local].push(candidate);
      //   } else {
      //     candidatesPerRoom[local] = [];
      //     candidatesPerRoom[local].push(candidate);
      //   }
      // }
      // const rooms = Object.keys(candidatesPerRoom);
      const zip = new jszip();
      for (let i = 0; i < 1; i++) {
        const candidate = this.candidates[i];
        const pdf = await generateCheckboxPdf(
          /*i,*/
          this.process,
          candidate,
          this.maxQuestions,
          this.date
        );
        zip.file(`provas - ${candidate._id}.pdf`, pdf, { binary: true });
      }
      const zipFile = await zip.generateAsync({ type: "blob" });
      saveAs(zipFile, "lista.zip");
      this.loading = false;

      // };
      // reader1.readAsArrayBuffer(this.candidatesFile);
    },
  },
};
</script>
