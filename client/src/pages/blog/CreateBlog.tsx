import { useState } from "react";

import { Navigate } from "react-router-dom";

// component
import Editor from "../../components/blog/editor/Editor";

import { createBlog } from "../../services/blog";
import { useAuth } from "../../hooks";
import Alert from "../../components/Alert";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";

export default function CreatePost() {
  const { accessToken, payload } = useAuth();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags((prev) => {
        return [...prev, inputValue.trim()];
      });
      setInputValue("");
    }
  };

  const handleTagDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    console.log(event.target.files?.[0]);

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
      setCoverImage(file);
    }
  };

  const submitPost = async (event: React.FormEvent) => {
    event.preventDefault();

    setShowAlert(true);
    setError("");

    // Validate the form
    if (!title || !content || !coverImage || tags.length === 0) {
      setError("Please fill in all the required fields.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2500);
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

      console.log("formData: ", formData);

      try {
        const res = await createBlog(payload.id, formData, accessToken);

        if (!res?.status) {
          // setError(res?.data.message);
          // setTimeout(() => {
          //   setShowAlert(false);
          // }, 3000);
          return;
        }

        setTimeout(() => {
          setShowAlert(false);
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
    <>
      {/* Alert */}
      {!error && showAlert && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          Create successfully
        </Alert>
      )}

      {error && showAlert && (
        <Alert
          textColor="#991b1b"
          bgColor="#fef2f2"
          icon={<VscError className="text-xl" />}
        >
          {error}
        </Alert>
      )}

      <div className="max-w-2xl px-5 mx-auto my-10">
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
                      {tag}
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
            Create post
          </button>
        </div>
      </div>
    </>
  );
}
