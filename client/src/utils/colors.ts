import colors from "tailwindcss/colors";

export interface IColor {
  textColor: string;
  bgColor: string;
}

export const colorOfDays: { [key: string]: IColor } = {
  mo: { textColor: colors.yellow[700], bgColor: colors.yellow[200] },
  tu: { textColor: colors.pink[700], bgColor: colors.pink[200] },
  we: { textColor: colors.green[700], bgColor: colors.green[200] },
  th: { textColor: colors.orange[700], bgColor: colors.orange[200] },
  fr: { textColor: colors.cyan[700], bgColor: colors.cyan[200] },
  sa: { textColor: colors.purple[700], bgColor: colors.purple[200] },
  su: { textColor: colors.red[700], bgColor: colors.red[200] },
};

// export const pastelColor: {
//   [key: string]: IColor;
// } = {
//   mo: { textColor: "#F4B183", bgColor: "#FFEFD5" }, // Pastel Orange
//   tu: { textColor: "#F675A8", bgColor: "#FADBD8" }, // Pastel Pink
//   we: { textColor: "#70AF85", bgColor: "#D1F2EB" }, // Pastel Green
//   th: { textColor: "#6096B4", bgColor: "#D6EAF8" }, // Pastel Blue
//   fr: { textColor: "#D0B8A8", bgColor: "#faefe8" }, // Pastel beige
//   sa: { textColor: "#BA90C6", bgColor: "#F5EEF8" }, // Pastel Lavender
//   su: { textColor: "#FA877F", bgColor: "#fcdcdc" }, // Pastel red
// };

// export const pastelColor: {
//   [key: string]: IColor;
// } = {{ textColor: "#F4B183", bgColor: "#FFEFD5" }, // Pastel Orange
// { textColor: "#F675A8", bgColor: "#FADBD8" }, // Pastel Pink
//    { textColor: "#70AF85", bgColor: "#D1F2EB" }, // Pastel Green
//    { textColor: "#6096B4", bgColor: "#D6EAF8" }, // Pastel Blue
//   { textColor: "#D0B8A8", bgColor: "#faefe8" }, // Pastel beige
//  { textColor: "#BA90C6", bgColor: "#F5EEF8" }, // Pastel Lavender
//  { textColor: "#FA877F", bgColor: "#fcdcdc" }, // Pastel red
// };

export const pastelColor = [
  { textColor: "#F4B183", bgColor: "#FFEFD5" }, // Pastel Orange
  { textColor: "#F675A8", bgColor: "#FADBD8" }, // Pastel Pink
  { textColor: "#70AF85", bgColor: "#D1F2EB" }, // Pastel Green
  { textColor: "#6096B4", bgColor: "#D6EAF8" }, // Pastel Blue
  { textColor: "#D0B8A8", bgColor: "#faefe8" }, // Pastel beige
  { textColor: "#BA90C6", bgColor: "#F5EEF8" }, // Pastel Lavender
  { textColor: "#FA877F", bgColor: "#fcdcdc" }, // Pastel red
  { textColor: "#4BAEA0", bgColor: "#CAF7E3" }, // Pastel mint
  { textColor: "#555555", bgColor: "#ffffff" }, // Pastel white
  { textColor: "#fb7185", bgColor: "#fff1f2" }, // Pastel rose
  { textColor: "#867070", bgColor: "#f0dbcc" }, // Pastel brown
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * pastelColor.length);

  const color = pastelColor[randomIndex];
  // pastelColor.splice(randomIndex, 1); // Remove the selected color from pastelColor
  return color;
};

// export const colorsType = {
//   normal: "#CCC8B9",
//   fire: "#FFB27A",
//   water: "#9AD6F0",
//   electric: "#FFFACD",
//   grass: "#AEDAAF",
//   ice: "#C1EFEF",
//   fighting: "#EF9590",
//   poison: "#D7A6D9",
//   ground: "#E6D9A6",
//   flying: "#D9D6F3",
//   psychic: "#F3C2D3",
//   bug: "#D6E3A6",
//   rock: "#D8D2AB",
//   ghost: "#B8A8C7",
//   dragon: "#B4A1F9",
//   dark: "#AFA8A5",
//   steel: "#D6D6DF",
//   fairy: "#F3C7D6",
// };
