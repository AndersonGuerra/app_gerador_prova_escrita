import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import generatePdf from "./generatePdf";

export default function (list, process, area, sala, date, pageMaxNumber) {
  return new Promise((res) => {
    const content = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const pdfItem = generatePdf(false, process, item, pageMaxNumber, date);
      content.push(
        pdfItem,
        i !== list.length - 1
          ? {
              text: "",
              pageBreak: "after",
            }
          : {}
      );
    }
    pdfMake.createPdf({ content }).getBuffer((result) => res(result));
    // pdfMake
    //   .createPdf({ content })
    //   .download(`lista ${area} - ${sala}.pdf`, () => {
    //     res("feito");
    //   });
  });
}
