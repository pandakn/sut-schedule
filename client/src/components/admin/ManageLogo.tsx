import { useLogo } from "../../hooks";

const ManageLogo = () => {
  const {
    selectedImage,
    handleImageUpload,
    setLogo,
    setSelectedImage,
    href,
    handleInputChange,
    submitConfigLogo,
  } = useLogo();

  return (
    <div className="max-w-sm p-6 mx-auto my-8 border rounded-md shadow-xl">
      <h3 className="mb-6 text-2xl text-center ">Config Logo</h3>
      <form className="flex flex-col justify-center gap-y-6">
        {/* logo */}
        {selectedImage ? (
          <div className="flex flex-col items-center mb-3 gap-y-2">
            <div className="w-32">
              <img
                src={selectedImage}
                alt="Selected"
                className="object-cover"
              />
            </div>
            <div className="space-x-2 space-y-3">
              <label className="px-4 py-2 text-gray-800 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white ">
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
                  setLogo(null);
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
              Add a Logo
              <input
                onChange={handleImageUpload}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        )}
        {/* href */}
        <input
          type="text"
          placeholder="href..."
          name="href"
          value={href}
          onChange={handleInputChange}
          className="px-4 py-2 text-lg text-gray-800 border border-gray-800 rounded-lg focus:outline-gray-900 "
        />
        <button
          onClick={submitConfigLogo}
          className="px-4 py-2 text-white capitalize bg-gray-900 disabled:opacity-30 rounded-xl hover:bg-gray-900/75"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ManageLogo;
