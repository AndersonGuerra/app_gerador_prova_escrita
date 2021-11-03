const bwipjs = require("bwip-js");
import { MD5 } from "crypto-js";

export default async function (text) {
  try {
    let canvas = document.createElement("canvas");
    const hashed = MD5(text).toString();
    const opt = {
      bcid: "code128",
      text: hashed.substring(0, 10),
      textxalign: "center",
      scale: 1,
      height: 10,
    };
    await bwipjs.toCanvas(canvas, opt);
    // document.getElementById("my-img").src =
    return canvas.toDataURL(); //.split(";base64,")[1];
  } catch (e) {
    return "";
  }
}
