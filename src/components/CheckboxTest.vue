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
        <v-text-field v-model="maxQuestions" label="Número de questões"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-file-input v-model="candidatesFile" placeholder="Clique aqui para inserir a planilha de candidatos">
        </v-file-input>
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
// import { saveAs } from "file-saver";
import generateCheckboxPdf from "../services/generateCheckboxPdf";
// import sortArray from "sort-array";
import xlsx from "xlsx";
import Loading from "./Loading.vue";
import axios from "axios";
import { saveAs } from "file-saver";

export default {
  components: {
    Loading,
  },
  data: () => ({
    loading: false,
    process: "Processo Seletivo Especial para Curso de Zootecnia UFRA/UNIFAP - Edital 17/2022",
    date: "29/01/2023",
    maxQuestions: 30,
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
        let a = await axios.get(
          `http://localhost:3030/inscriptions?id_ps=63a1c7ed48b6fe1bbf783fe8&$populate=id_user`
        );
        let inscriptions = a.data.filter(e => e.room)
        console.log(inscriptions)

        const zip = new jszip();
        const candidatesInRoom = []
        console.log(sheetJson)
        for (const row of sheetJson) {
          let inscription = inscriptions.filter(e => {
            return e.id_user.name === row["NOME"]
          })[0]
          if (inscription) {
            inscription.room = row["SALA"]
            candidatesInRoom.push(inscription)
          }
        }
        // for (let i = 0; i < candidatesInRoom.length; i++) {
        //   const candidate = candidatesInRoom[i];
        // }
        const pdf = await generateCheckboxPdf(
          this.process,
          candidatesInRoom,
          this.maxQuestions,
          this.date
        );
        zip.file(`provas - espanhol.pdf`, pdf, { binary: true });
        const zipFile = await zip.generateAsync({ type: "blob" });
        console.log('hummmmmmmmmmmmmm')
        saveAs(zipFile, `espanhol.zip`);
      }
      // let salas = [];
      // a = a.data.filter((e) => e.accepted_isencao || e.is_paid);
      // a = a.data;
      // a.forEach((i) => {
      //   if (!salas.includes(i.room)) salas.push(i.room);
      // });
      // this.candidates = [...a];
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
      // const zipao = new jszip();
      // for (const sala of salas) {
      //   console.log(sala);
      //   const zip = new jszip();
      //   const candidatesInRoom = this.candidates.filter((e) => e.room === sala);
      //   const pdf = await generateCheckboxPdf(
      //     this.process,
      //     candidatesInRoom,
      //     this.maxQuestions,
      //     this.date
      //   );
      // for (let i = 0; i < candidatesInRoom.length; i++) {
      //   const candidate = candidatesInRoom[i];
      //   const pdf = await generateCheckboxPdf(
      //     /*i,*/
      //     this.process,
      //     candidate,
      //     this.maxQuestions,
      //     this.date
      //   );
      //   zip.file(`provas - ${candidate._id}.pdf`, pdf, { binary: true });
      // }
      // zip.file(`provas - ${sala.replace("/", "-")}.pdf`, pdf, {
      //   binary: true,
      // });
      // const zipFile = await zip.generateAsync({ type: "blob" });
      // saveAs(zipFile, `${sala.replace("/", "-")}.zip`);
      // zipao.file(`${sala.replace("/", "-")}.zip`, zipFile);
      // }
      this.loading = false;

      // };
      reader1.readAsArrayBuffer(this.candidatesFile);
    },
  },
};
</script>
