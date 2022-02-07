import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import barcode from "./barcode";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const unchecked =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF+2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMGUyMmJhZC1lY2VkLTQzZWUtYjIzZC1jNDZjOTNiM2UzNWMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5M2FhOTEzYy1hZDVmLWZmNGEtOWE5Ny1kMmUwZjdmYzFlYmUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYmY2ODFlMy1hMTRhLTQyODMtOGIxNi0zNjQ4M2E2YmZlNjYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjNiZjY4MWUzLWExNGEtNDI4My04YjE2LTM2NDgzYTZiZmU2NiIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozNzoyMCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMwZTIyYmFkLWVjZWQtNDNlZS1iMjNkLWM0NmM5M2IzZTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozODo1NyswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6AB6cQAAAPxJREFUOMvF1b1Kw1AYBuAnFf8QL8WlIHQJIriIdyEu4qCTXop7dwenTgUHpYvgJVhob8AuakE+h9hapJqcFDXvFDgPIXlzvgNLjnQ9GlRM340TK7DsUtRI2zqH09txxUzWn3IrhK4DecXs6wjhnqHwZk/K1fIiDAs81krCW54KPBDG8iTcNBIGf4ND1MWTdmrgqIOL5TM0S8SRhmMu1dAo+2DZ57t9eWajtKrvN1GVnrMK9HewhbBy+nPPJbTsJwmymOn8P7fkfLzQGCoG4G4S3vZc4J4QOnY0KyZ3LYQHjqcjf1Qxrx/inDXtWsfNlU1YdeZOP+Gg67mwwTvIDqR1iAowgQAAAABJRU5ErkJggg==";

function generatePage(process, candidate, pageNumber, date) {
  const warnSizes = 9;
  console.log(candidate.number)
  const code = barcode(candidate.number);
  const rows = [];
  const startingLine = pageNumber * 25 - 25;
  const endingLine = pageNumber * 25;
  for (let i = startingLine; i < endingLine; i++) {
    rows.push([i + 1, { text: " ", fontSize: 10 }]);
  }

  let dd = [
    // content: [
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              columns: [
                { text: process },
                { text: `${candidate.area}`, alignment: "right" },
              ],
            },
          ],
          [
            {
              columns: [
                { text: `Candidato: ${candidate.name}` },
                { text: `N. Insc: ${candidate.number}`, alignment: "right" },
              ],
            },
          ],
        ],
      },
    },
    { text: " ", fontSize: 6 },
    {
      columnGap: 10,
      columns: [
        {
          image: code,
          width: 125,
        },
        [
          {
            width: "*",
            text: `Local: ${candidate.place}`,
          },
          { width: "*", text: `Data: ${date}` },
        ],
      ],
    },
    "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
    {
      table: {
        widths: ["*", "auto"],
        body: [
          [{ text: process }, { text: `${candidate.area}` }],
          [
            {
              text: `Local: ${candidate.place}`,
            },
            {
              text: `Data: ${date}`,
            },
          ],
        ],
      },
    },
    {
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            [
              {
                text: ">>>>> ATENÇÃO <<<<<",
                fontSize: 10,
                alignment: "center",
              },
              {
                ul: [
                  {
                    text: "Escreva somente nas linhas numeradas abaixo",
                    fontSize: warnSizes,
                  },
                  { text: "Não assine as folhas", fontSize: warnSizes },
                  { text: "Não identifique as folhas", fontSize: warnSizes },
                ],
              },
            ],
            [
              "Uso exclusivo do DEPSEC",
              {
                columns: [
                  {
                    image: unchecked,
                    width: 10,
                  },
                  "Candidato Ausente",
                ],
                columnGap: 5,
              },
              {
                columns: [
                  {
                    image: unchecked,
                    width: 10,
                  },
                  "Última folha",
                ],
                columnGap: 5,
              },
            ],
            [
              { text: " ", fontSize: 10 },
              {
                image: code,
                alignment: "center",
              },
            ],
          ],
        ],
      },
    },
    " ",
    {
      text: `PROVA ESCRITA [FOLHA ${pageNumber}]`,
      alignment: "center",
    },
    " ",
    {
      table: {
        widths: ["auto", "*"],
        body: [...rows],
      },
    },
    // ],
  ];
  return dd;
}

function generatePdf(download, process, candidate, pageMaxNumber, date) {
  const pages = [];
  for (let i = 1; i <= pageMaxNumber; i++) {
    const newPage = generatePage(process, candidate, i, date);
    pages.push(
      newPage,
      i !== parseInt(pageMaxNumber)
        ? {
            text: "",
            pageBreak: "after",
          }
        : {}
    );
  }

  if (download) pdfMake.createPdf({ content: pages }).download("prova.pdf");
  else return pages;
}

export default generatePdf;
