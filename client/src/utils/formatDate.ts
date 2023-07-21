export const formatDate = (dateString: string | undefined) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  if (dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
};
