import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import generatePdf from "./generatePdf";

export default function (list, process, area, sala) {
  const content = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const pdfItem = generatePdf(false, process, item);
    console.log(pdfItem);
    pdfMake.createPdf({ content: pdfItem }).download("hum.pdf");
    content.push(pdfItem);
    break;
  }
  console.log(content);
  area;
  sala;
  //   pdfMake.createPdf({ content }).download(`lista ${area} - ${sala}.pdf`);
}
