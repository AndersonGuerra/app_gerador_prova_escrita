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
          v-model="pageMaxNumber"
          label="Número de páginas"
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
    <loading :loading="loading" />
  </v-container>
</template>
<script>
import jszip from "jszip";
import { saveAs } from "file-saver";
import generatePdfList from "../services/generatePdfList";
import sortArray from "sort-array";
import xlsx from "xlsx";
import Loading from "./Loading.vue";
export default {
  components: {
    Loading,
  },
  data: () => ({
    loading: false,
    process: "",
    date: "",
    pageMaxNumber: 1,
    fileCounter: 0,
    candidatesFile: null,
    ensalamentoFile: null,
    candidates: null,
    ensalamento: null,
  }),
  watch: {
    fileCounter: async function (val) {
      if (val === 2) {
        const dados = {};
        for (let i = 0; i < this.ensalamento?.length; i++) {
          const sala = this.ensalamento[i];
          const maxCandidates = sala[" Nº DE CANDIDATOS"];
          dados[`${sala["BLOCOS"]}${sala["SALA"]}`] = [];
          for (let j = 0; j < maxCandidates; j++) {
            const candidatesInArea = this.candidates.filter(
              (e) => parseInt(e["AREA"].substring(5)) === sala["ÁREA"]
            );
            if (candidatesInArea?.length > 0) {
              dados[`${sala["BLOCOS"]}${sala["SALA"]}`].push({
                area: candidatesInArea[0]["AREA"],
                number: candidatesInArea[0]["N. INSC."],
                name: candidatesInArea[0]["NOME DO CANDIDATO"],
                place: `${sala["BLOCOS"]} - SALA ${sala["SALA"]}`,
              });
              const candidateIndex = this.candidates.findIndex(
                (e) =>
                  e["NOME DO CANDIDATO"] ===
                  candidatesInArea[0]["NOME DO CANDIDATO"]
              );
              if (candidateIndex > -1) {
                this.candidates.splice(candidateIndex, 1);
              }
            }
          }
        }
        const salas = Object.keys(dados);
        // const pdfList = [];
        const zip = new jszip();
        for (let i = 0; i < salas.length; i++) {
          const sala = salas[i];
          const pdf = await generatePdfList(
            dados[sala],
            this.process,
            dados[sala][0]["area"],
            dados[sala][0]["place"],
            this.date,
            this.pageMaxNumber
          );
          zip.file(
            `lista ${dados[sala][0]["area"]} - ${dados[sala][0][
              "place"
            ].replaceAll("/", "-")}.pdf`,
            pdf,
            { binary: true }
          );
        }
        const zipFile = await zip.generateAsync({ type: "blob" });
        saveAs(zipFile, "lista.zip");
        this.loading = false;

        this.fileCounter = 0;
      }
    },
  },
  methods: {
    async generatePdf() {
      this.loading = true;
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
        this.fileCounter++;
      };
      reader2.onload = () => {
        const workbook = xlsx.read(reader2.result);
        const sheet = workbook.SheetNames[0];
        let sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {});
        this.ensalamento = sheetJson;
        this.fileCounter++;
      };
      reader1.readAsArrayBuffer(this.candidatesFile);
      reader2.readAsArrayBuffer(this.ensalamentoFile);
    },
  },
};
</script>
