import { Link } from "react-router-dom";

type BlogCardProps = {
  id: string;
  author: string;
  cover: string;
  title: string;
  body: string;
  tags: string[];
  created: string | undefined;
};

const BlogCard = ({
  id,
  author,
  cover,
  title,
  body,
  tags,
  created,
}: BlogCardProps) => {
  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
      <div className="md:min-h-fit md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="object-cover w-full min-h-full md:w-48"
            src={cover}
            alt="Blog Post"
          />
        </div>
        <div className="p-8">
          <div className="text-lg font-semibold tracking-wide text-gray-600">
            {author}
            <span className="mx-2 ">·</span>
            <span className="font-medium text-gray-400 ">{created}</span>
          </div>
          <Link
            to={`/blog/${id}`}
            className="block mt-1 text-xl font-medium leading-tight text-black hover:underline"
          >
            {title}
          </Link>
          <p
            dangerouslySetInnerHTML={{ __html: body }}
            className="mt-2 text-gray-500 line-clamp-2"
          >
            {/* <div className=""  /> */}
          </p>
          <section className="flex gap-2 mt-2">
            {tags.map((t, idx) => (
              <p
                key={idx}
                className="px-2 py-1 text-gray-500 rounded bg-gray-50"
              >
                #{t}
              </p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
