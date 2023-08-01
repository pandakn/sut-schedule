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

export const pastelColor = [
  { textColor: "#5E2A08", bgColor: "#FFEFD6" }, // Pastel Orange
  { textColor: "#60062A", bgColor: "#FAD9D6" }, // Pastel Pink
  { textColor: "#213B2A", bgColor: "#CFF2EA" }, // Pastel Green
  { textColor: "#1F3642", bgColor: "#D8EBF8" }, // Pastel Blue
  { textColor: "#493527", bgColor: "#FAF0EA" }, // Pastel beige
  { textColor: "#4B2B54", bgColor: "#F4EDF8" }, // Pastel Lavender
  { textColor: "#670B04", bgColor: "#FCDEDE" }, // Pastel red
  { textColor: "#424242", bgColor: "#ffffff" }, // Pastel white
  { textColor: "#7C0315", bgColor: "#FFF0F1" }, // Pastel rose
  { textColor: "#352C2C", bgColor: "#F0DBCC" }, // Pastel brown
  { textColor: "#56330B", bgColor: "#FFF3E0" }, // Pastel Yellow
];

let remainingColors = [...pastelColor];

export const getRandomColor = () => {
  if (remainingColors.length === 0) {
    remainingColors = [...pastelColor];
  }
  const randomIndex = Math.floor(Math.random() * remainingColors.length);
  const color = remainingColors[randomIndex];
  remainingColors.splice(randomIndex, 1); // Remove the selected color from remainingColors
  return color;
};
