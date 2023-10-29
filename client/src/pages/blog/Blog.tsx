import { useCallback, useEffect, useState } from "react";

// services
import { getBlogs } from "../../services/blog";

// component
import BlogCard from "../../components/blog/BlogCard";
import SortButton from "../../components/blog/SortButton";
import PopularTags from "../../components/blog/PopularTags";

// utils
import { formatDate } from "../../utils/formatDate";

// icons
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

export interface ITag {
  name: string;
  blogCount?: number;
}

export interface IBlog {
  _id: string;
  author: { _id: string; username: string; name: string };
  cover: string;
  title: string;
  body: string;
  tags: ITag[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

type BlogProps = {
  tag?: string;
};

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const Blog = ({ tag }: BlogProps) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(-1);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFilter(+value);
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchQuery(searchFieldString);
  };

  const fetchAllBlogs = useCallback(async () => {
    const res = await getBlogs({ tag, sort: selectedFilter });

    if (!res?.status) {
      const msg = res?.data.message;
      setErrorMsg(msg);
      return;
    }

    const data = res?.data.result;
    const filteredData = data.filter((item: IBlog) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBlogs(filteredData);
  }, [searchQuery, selectedFilter, tag]);

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  console.log(blogs);

  return (
    <>
      {errorMsg && (
        <div className="absolute space-y-6 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <h3 className="text-3xl md:text-5xl">{errorMsg}</h3>
        </div>
      )}

      <div className="flex">
        <PopularTags />
        <div id="blog" className="container mx-auto mb-20">
          <div className="flex flex-wrap justify-between mb-4 md:mb-0">
            {/* search */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiOutlineSearch className="w-6 h-6 text-gray-400" />
              </div>
              <input
                onChange={onSearchChange}
                type="text"
                value={searchQuery}
                className="block px-6 py-3 pl-10 text-sm text-gray-900 bg-gray-100 w-72 rounded-xl placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
                placeholder="Search blogs..."
              />
              {searchQuery && (
                <div
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 flex items-center pr-3 left-64 hover:cursor-pointer"
                >
                  <AiOutlineClose className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
            <SortButton handleFilterChange={handleFilterChange} />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs &&
              blogs.map((blog, idx) => {
                return (
                  <BlogCard
                    key={idx}
                    slug={blog.slug}
                    author={blog.author.name}
                    title={blog.title}
                    body={blog.body}
                    cover={`${IMAGE_URL}/${blog.cover}`}
                    tags={blog.tags}
                    created={formatDate(blog.createdAt?.toString())}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
