import chroma from "chroma-js";

const data = [
  {
    id: 1,
    hexCode: chroma.random().hex(),
    lock: false,
  },
  {
    id: 2,
    hexCode: chroma.random().hex(),
    lock: false,
  },
  {
    id: 3,
    hexCode: chroma.random().hex(),
    lock: false,
  },
  {
    id: 4,
    hexCode: chroma.random().hex(),
    lock: false,
  },
  {
    id: 5,
    hexCode: chroma.random().hex(),
    lock: false,
  },
];
// // Adding luminance to data array(no need anymore)
// for (let i = 0; i < data.length; i++) {
//   data[i].luminance = chroma(data[i].hexCode).luminance();
// }

export default data;
