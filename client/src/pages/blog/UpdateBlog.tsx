import { useCallback, useEffect, useState } from "react";

import { Navigate, useParams } from "react-router-dom";

// component
import Editor from "../../components/blog/editor/Editor";

import { getBlogById, updateBlog } from "../../services/blog";
import { useAuth } from "../../hooks";
import toast from "react-hot-toast";
import { hasEnoughContent } from "../../utils/checkTextInHtmlTag";
import { ITag } from "./Blog";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const UpdateBlog = () => {
  const { slug } = useParams();
  const { accessToken, payload } = useAuth();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [fileOld, setFileOld] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTag: ITag = { name: inputValue.trim() };
      setTags((prev) => [...prev, newTag]); // Add the new tag to the tags state
      setInputValue("");
    }
  };

  const handleTagDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
      setCoverImage(file);
    }
  };

  const fetchBlogById = useCallback(async () => {
    const res = await getBlogById(slug);
    const data = res.result;

    setId(data._id);
    setTitle(data.title);
    setTags(data.tags);
    setContent(data.body);
    setSelectedImage(`${IMAGE_URL}/${data.cover}`); // Set the cover image URL
    setFileOld(data.cover);
  }, [slug]);

  useEffect(() => {
    fetchBlogById();
  }, [fetchBlogById]);

  const submitPost = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the form
    if (!title || !selectedImage || tags.length === 0) {
      toast.error("Please fill in all the required fields.", {
        duration: 2500,
      });
      return;
    }

    const enoughContent = hasEnoughContent(content, 20);

    if (!enoughContent) {
      toast.error("Content must be at least 20 characters", {
        duration: 2500,
      });
      return;
    }

    if (accessToken) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("body", content);
      formData.append("fileOld", fileOld);
      if (coverImage) {
        formData.append("cover", coverImage);
      }

      tags.forEach((tag) => {
        formData.append("tags[]", tag.name); // Append tags as an array in the form data
      });

      try {
        const res = await updateBlog(id, formData, accessToken);

        if (!res?.status) return;

        toast.success("Update successfully", { duration: 1500 });

        setTimeout(() => {
          setRedirect(true);
        }, 1500);
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  if (redirect) {
    const role = payload.role;
    const href = role === "admin" ? "/admin/manage-blogs" : "/";

    return <Navigate to={href} />;
  }
  return (
    <>
      <div className="max-w-4xl px-5 mx-auto my-10">
        <div>
          <div className="flex flex-col gap-5">
            {/* cover */}
            {selectedImage ? (
              <div className="flex items-center mb-3">
                <div className="w-56">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="object-cover"
                  />
                </div>
                <div className="ml-10 space-x-2 space-y-3">
                  <label className="px-4 py-2 text-lg text-gray-800 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white ">
                    Change
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => {
                      setCoverImage(null);
                      setSelectedImage("");
                    }}
                    className="px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="">
                <label className="px-4 py-2 text-lg text-gray-800 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white ">
                  Add a cover image
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            )}
            {/* title */}
            <input
              className="w-full mt-2 text-4xl border-none lg:text-5xl focus:outline-none placeholder:text-4xl lg:placeholder:text-5xl placeholder:font-bold placeholder:text-gray-400"
              type="title"
              placeholder="Title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            {/* tags */}
            <ul className="flex items-center gap-1 mb-4">
              <li>
                <div className="flex gap-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-1 font-light text-gray-700 rounded-full bg-gray-200/60"
                    >
                      {tag.name}
                      <button
                        className="ml-2 text-gray-600"
                        onClick={() => handleTagDelete(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </li>
              <li>
                <input
                  hidden={tags.length >= 4}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  className="w-full border-none focus:outline-none"
                  placeholder={
                    tags.length > 0
                      ? "Add another tag..."
                      : "Add up to 4 tags..."
                  }
                />
              </li>
            </ul>
          </div>
          <Editor value={content} onChange={setContent} />
          <button
            onClick={submitPost}
            className="px-6 py-2 mt-5 font-medium text-white uppercase bg-gray-900 rounded-2xl hover:bg-gray-900/75"
          >
            Update post
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
