import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import barcode from "./barcode";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const images = {
  unchecked:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF+2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMGUyMmJhZC1lY2VkLTQzZWUtYjIzZC1jNDZjOTNiM2UzNWMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5M2FhOTEzYy1hZDVmLWZmNGEtOWE5Ny1kMmUwZjdmYzFlYmUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYmY2ODFlMy1hMTRhLTQyODMtOGIxNi0zNjQ4M2E2YmZlNjYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjNiZjY4MWUzLWExNGEtNDI4My04YjE2LTM2NDgzYTZiZmU2NiIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozNzoyMCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMwZTIyYmFkLWVjZWQtNDNlZS1iMjNkLWM0NmM5M2IzZTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozODo1NyswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6AB6cQAAAPxJREFUOMvF1b1Kw1AYBuAnFf8QL8WlIHQJIriIdyEu4qCTXop7dwenTgUHpYvgJVhob8AuakE+h9hapJqcFDXvFDgPIXlzvgNLjnQ9GlRM340TK7DsUtRI2zqH09txxUzWn3IrhK4DecXs6wjhnqHwZk/K1fIiDAs81krCW54KPBDG8iTcNBIGf4ND1MWTdmrgqIOL5TM0S8SRhmMu1dAo+2DZ57t9eWajtKrvN1GVnrMK9HewhbBy+nPPJbTsJwmymOn8P7fkfLzQGCoG4G4S3vZc4J4QOnY0KyZ3LYQHjqcjf1Qxrx/inDXtWsfNlU1YdeZOP+Gg67mwwTvIDqR1iAowgQAAAABJRU5ErkJggg==",

  unifap:
    "data:image/jpeg;base64,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",
};

function textoBasico(text, fontSize) {
  return { text, fontSize: fontSize ? fontSize : 9 };
}

function colunaQuestao(titulo) {
  return {
    table: {
      widths: ["auto"],
      headerRows: 1,
      body: [
        [titulo],
        [
          [
            { text: "A", alignment: "center" },
            { text: "B", alignment: "center" },
            { text: "C", alignment: "center" },
            { text: "D", alignment: "center" },
            { text: "E", alignment: "center" },
          ],
        ],
      ],
    },
  };
}

function generatePage(process, candidate, maxQuestions, date) {
  //   const warnSizes = 9;
  //   console.log(process, "processo", candidate, "candaidto");
  //   const code = barcode(candidate.number);
  const questoes = [
    {
      columns: [],
    },
  ];
  for (let i = 1; i <= maxQuestions; i++) {
    const numeroQuestao = i < 10 ? `0${i}` : i;
    questoes[questoes.length - 1].columns.push(
      colunaQuestao(`Q${numeroQuestao}`)
    );
    if (i % 15 === 0) {
      questoes.push(textoBasico(" ", 1));
      questoes.push({
        columns: [],
      });
    }
  }
  if (questoes[questoes.length - 1].columns.length % 15 !== 0) {
    const faltantes = 15 - questoes[questoes.length - 1].columns.length;
    for (let i = 0; i < faltantes; i++) {
      questoes[questoes.length - 1].columns.push(textoBasico(" "));
    }
  }
  // const fontSize = 9;
  return [
    {
      table: {
        widths: ["auto", "*", "auto"],
        body: [
          [
            {
              image: images.unifap,
              width: 35,
            },
            {
              columns: [
                [
                  {
                    text: "UNIVERSIDADE FEDERAL DO AMAPÁ",
                    bold: true,
                    alignment: "center",
                  },
                  {
                    text: "PRÓ-REITORIA ENSINO DE DE GRADUAÇÃO",
                    bold: true,
                    alignment: "center",
                  },
                  {
                    text: "DEPARTAMENTO DE PROCESSOS SELETIVOS E CONCURSOS",
                    bold: true,
                    alignment: "center",
                  },
                  {
                    text: "Residência Multiprofissional em Saúde Coletiva 2022",
                    bold: true,
                    alignment: "center",
                  },
                ],
              ],
            },
            {
              width: "auto",
              text: "logo",
            },
          ],
        ],
      },
    },
    { text: " ", fontSize: 1 },
    {
      table: {
        widths: ["*", "auto"],
        body: [
          [textoBasico(`${process}`), "digital"],
          [textoBasico(`PROVA: ${candidate["CURSO"]}`), "digital"],
        ],
      },
    },
    { text: " ", fontSize: 1 },
    {
      table: {
        widths: ["*", "auto", "auto"],
        body: [
          [
            textoBasico("LOCAL: Bloco de Pós Graduação"),
            textoBasico(`${candidate["LOCAL"]}`),
            textoBasico(`DATA: ${date}`),
          ],
        ],
      },
    },
    { text: " ", fontSize: 1 },
    {
      table: {
        widths: ["*", "auto", "auto"],
        body: [
          [
            textoBasico(`NOME: ${candidate["NOME"]}`),
            textoBasico("N. INSC.: XXXXXXXX"),
            textoBasico("CPF: YYY.YYY.YYY-YY"),
          ],
        ],
      },
    },
    textoBasico("ASSINATURA DO CANDIDATO"),
    {
      table: {
        widths: ["*"],
        body: [[" "]],
      },
    },
    {
      columnGap: 10,
      columns: [
        [
          textoBasico("ASSINATURA DO FISCAL 1"),
          {
            table: {
              widths: ["*"],
              body: [[" "]],
            },
          },
        ],
        [
          textoBasico("ASSINATURA DO FISCAL 2"),
          {
            table: {
              widths: ["*"],
              body: [[" "]],
            },
          },
        ],
      ],
    },
    { text: " ", fontSize: 15 },
    ...questoes,
    { text: " " },
    {
      text: "INSTRUÇÕES:",
      bold: true,
      fontSize: 9,
    },
  ];
}

function generatePdf(i, process, candidate, maxQuestions, date) {
  const footer = {
    stack: [
      {
        fontSize: 8,
        ol: [
          textoBasico(
            "Confira seus dados impressos nessa folha e assine no local indicado"
          ),
          textoBasico("Preencha somente uma resposta por questão"),
          textoBasico("Não deixe nenhuma questão sem resposta"),
          textoBasico(
            "Utilize caneta esferográfica azul ou preta de material transparente para preencher suas respostas"
          ),
          textoBasico("Preencha somente dentro do campo, conforme modelo: {}"),
          textoBasico("Qualquer dúvida fale com o fiscal de sala"),
        ],
      },
    ],
    margin: [72, 40],
  };
  if (i === 70) {
    const page = generatePage(process, candidate, maxQuestions, date);
    pdfMake
      .createPdf({
        pageMargins: [20, 40, 20, 5],
        content: page,
        footer: footer,
      })
      .open(); //("prova.pdf");
  }
  //   return pages;
  //   return new Promise((res) => {
  //     pdfMake.createPdf({ content: page }).getBuffer((result) => res(result));
  //   });
}

export default generatePdf;