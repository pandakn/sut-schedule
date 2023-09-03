import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

// component
import Editor from "../../components/blog/editor/Editor";
import SuggestionTags from "../../components/blog/SuggestionTags";

import { createBlog, getTags } from "../../services/blog";
import { useAuth } from "../../hooks";
import toast from "react-hot-toast";
import { ITag } from "./Blog";
import { hasEnoughContent } from "../../utils/checkTextInHtmlTag";

const CreateBlog = () => {
  const { accessToken, payload } = useAuth();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTagValue, setInputTagValue] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<ITag[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<ITag[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTagValue(e.target.value);
    setShowSuggestions(true);
  };

  // Autocomplete tags
  useEffect(() => {
    // Filter the suggested tags based on the input value
    const filteredTags = suggestedTags.filter((tag) =>
      tag.name.toLowerCase().includes(inputTagValue.toLowerCase())
    );

    // Exclude tags that are already in the tags list
    const uniqueFilteredTags = filteredTags.filter(
      (tag) => !tags.includes(tag.name)
    );

    if (uniqueFilteredTags.length < 1 && !tags.includes(inputTagValue)) {
      setFilteredSuggestions([{ name: inputTagValue }]);
      return;
    }

    setFilteredSuggestions(uniqueFilteredTags);
  }, [inputTagValue, suggestedTags, tags]);

  const handleClickAddTag = useCallback(
    (name: string) => {
      if (tags.length >= 4) {
        toast.error("Only 4 tags allowed");
        return;
      }

      setTags((prev) => {
        return [...prev, name.trim()];
      });
      setInputTagValue("");
    },
    [tags.length]
  );

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

  const fetchTags = useCallback(async () => {
    const res = await getTags();
    const data = res?.data.result;
    setSuggestedTags(data);
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const submitPost = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the form
    if (!title || !coverImage || tags.length === 0) {
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
      if (coverImage) {
        formData.append("cover", coverImage);
      }

      tags.forEach((tag) => {
        formData.append("tags[]", tag); // Append tags as an array in the form data
      });

      try {
        const res = await createBlog(payload.id, formData, accessToken);

        if (!res?.status) {
          toast.error(res?.data.message, { duration: 2500 });
          return;
        }

        toast.success("Create successfully", { duration: 1500 });

        setTimeout(() => {
          setRedirect(true);
        }, 1500);
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
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
            placeholder="Title here.."
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />

          {/* tags */}
          <section className="relative mb-8">
            <div ref={containerRef} className="flex items-center gap-x-1">
              <div>
                <div className="flex gap-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-1 font-light text-gray-700 rounded-full bg-gray-200/60"
                    >
                      #<span className="ml-1 text-lg">{tag}</span>
                      <button
                        className="ml-4 text-xl font-bold text-gray-600 hover:text-red-600 "
                        onClick={() => handleTagDelete(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <p>
                <input
                  ref={inputRef}
                  hidden={tags.length >= 4}
                  type="text"
                  value={inputTagValue}
                  onChange={handleInputChange}
                  // onKeyDown={handleInputKeyDown}
                  onFocus={handleInputFocus}
                  className="w-full border-none focus:outline-none"
                  placeholder={
                    tags.length > 0
                      ? "Add another tag..."
                      : "Add up to 4 tags..."
                  }
                />
              </p>
            </div>
            <SuggestionTags
              suggestions={filteredSuggestions}
              handleClickAddTag={handleClickAddTag}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              containerRef={containerRef}
              inputRef={inputRef}
            />
          </section>
        </div>
        <Editor value={content} onChange={setContent} />
        <button
          onClick={submitPost}
          className="px-6 py-2 mt-5 font-medium text-white uppercase bg-gray-900 rounded-2xl hover:bg-gray-900/75"
        >
          Create post
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
