import { Link } from "react-router-dom";

import { ITag } from "../../pages/blog/Blog";

type BlogCardProps = {
  slug: string;
  author: string;
  cover: string;
  title: string;
  body: string;
  tags: ITag[];
  created: string | undefined;
};

const BlogCard = ({
  slug,
  author,
  cover,
  title,
  body,
  tags,
  created,
}: BlogCardProps) => {
  const cleanBody = body.replace(
    /<br\s?\/?>|<u\s?\/?>|<strong\s?\/?>|<em\s?\/?>/g,
    ""
  );

  return (
    <div className="overflow-hidden bg-white shadow-md rounded-xl">
      <img className="object-cover w-full h-64 " src={cover} alt="Blog Post" />
      <div className="p-8">
        <div className="text-lg font-semibold tracking-wide text-gray-600">
          {author}
          <span className="mx-2 ">·</span>
          <span className="font-medium text-gray-400 ">{created}</span>
        </div>
        <Link
          to={`/blog/${slug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="block mt-1 text-2xl font-medium leading-tight text-black hover:underline"
        >
          {title}
        </Link>
        <div
          dangerouslySetInnerHTML={{ __html: cleanBody }}
          className="mt-2 text-gray-500 line-clamp"
        ></div>
        <section className="flex flex-wrap gap-2 mt-2">
          {tags.map((t, idx) => (
            <Link
              to={`/blogs/tag/${t.name}`}
              key={idx}
              onClick={() => window.scrollTo(0, 0)}
              className="px-2 py-1 text-gray-500 rounded bg-gray-50 hover:cursor-pointer hover:opacity-70"
            >
              #{t.name}
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BlogCard;
