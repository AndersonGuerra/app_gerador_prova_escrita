import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import generatePdf from "./generatePdf";

export default function (list, process, area, sala) {
  return new Promise((res) => {
    const content = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const pdfItem = generatePdf(false, process, item, 1);
      content.push(
        pdfItem
        // TODO: verificar se precisa do pagebreak aqui
        // i !== list.length - 1
        //   ? {
        //       text: "",
        //       pageBreak: "after",
        //     }
        //   : {}
      );
    }
    pdfMake
      .createPdf({ content })
      .download(`lista ${area} - ${sala}.pdf`, () => {
        res("feito");
      });
  });
}
