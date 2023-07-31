// Function to check if the content contains at least 20 characters in the text inside HTML tags
export const hasEnoughContent = (htmlContent: string, length: number) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const textContent = doc.body.textContent || "";

  return textContent.length >= length;
};
