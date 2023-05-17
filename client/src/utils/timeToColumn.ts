const timesOfDay = [
  "Day/Time",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export const timeToCol = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const remainder = minutes / 60;
  const numberOfColumns = timesOfDay.length;
  const calculatedCol = (hours + remainder) * 2 - numberOfColumns + 2;

  return calculatedCol;
};
