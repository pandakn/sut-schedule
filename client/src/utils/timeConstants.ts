export const timeConstants = () => {
  const startTime = "8:00";
  const stopWhen = "22:30";
  const valueIncrement = 6;

  const timeValueArray = [];

  let currentTime = startTime;
  let value = 97;

  while (currentTime !== stopWhen) {
    timeValueArray.push({ time: currentTime, value: value.toString() });

    const [hours, minutes] = currentTime.split(":").map(Number);
    const nextTimeMinutes = minutes + 30;

    if (nextTimeMinutes >= 60) {
      const nextTimeHours = hours + 1;
      currentTime = `${nextTimeHours.toString().padStart(2, "0")}:00`;
    } else {
      currentTime = `${hours.toString().padStart(2, "0")}:${nextTimeMinutes
        .toString()
        .padStart(2, "0")}`;
    }

    value += valueIncrement;
  }

  return timeValueArray;
};
