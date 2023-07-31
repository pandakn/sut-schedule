// Assuming you have a function to remove special characters from the string
// If not, you can use this regex to remove non-alphanumeric characters: /[^a-zA-Z0-9 ]/g
function removeSpecialCharacters(str: string): string {
  return str.replace(/[^\w\s]/g, "");
}

export const titleToSlug = (title: string): string => {
  console.log("title ", title);

  const cleanedTitle = removeSpecialCharacters(title);
  console.log(cleanedTitle);

  const slug = cleanedTitle
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "-"); // Remove characters other than letters, numbers, and dashes
  return slug;
};
