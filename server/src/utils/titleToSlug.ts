import slugify from "slugify";

export const titleToSlug = (title: string, id: string): string => {
  const slug = slugify(title, { lower: true, locale: "th" });

  return `${slug}-${id}`;
};
