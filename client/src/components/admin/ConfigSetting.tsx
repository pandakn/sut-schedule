import { useLogo } from "../../hooks";

const ConfigSetting = () => {
  const {
    selectedImage,
    configInput,
    handleImageUpload,
    setLogo,
    setSelectedImage,
    handleInputChange,
    submitConfigSetting,
  } = useLogo();

  return (
    <div className="p-6 my-8 border rounded-lg shadow-xl w-96">
      <h3 className="mb-6 text-2xl text-center ">Config Logo</h3>
      <div className="flex flex-col justify-center gap-y-6">
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

        {/* footer text */}
        <div className="flex flex-col gap-y-1">
          <label
            htmlFor="footer-text"
            className="text-gray-700 text-sm font-bold"
          >
            Footer Text
          </label>
          <input
            type="text"
            placeholder="type your footer text..."
            name="footerText"
            value={configInput.footerText}
            onChange={handleInputChange}
            className="px-4 py-2 text-lg text-gray-800 border border-gray-800 rounded-lg focus:outline-gray-900 "
          />
        </div>

        {/* href */}
        <div className="flex flex-col gap-y-1">
          <label
            htmlFor="footer-href"
            className=" text-gray-700 text-sm font-bold"
          >
            Footer Link
          </label>
          <input
            type="text"
            placeholder="link..."
            name="href"
            value={configInput.href}
            onChange={handleInputChange}
            className="px-4 py-2 text-lg text-gray-800 border border-gray-800 rounded-lg focus:outline-gray-900 "
          />
        </div>
        <button
          onClick={submitConfigSetting}
          className="px-4 py-2 text-white capitalize bg-gray-900 disabled:opacity-30 rounded-xl hover:bg-gray-900/75"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ConfigSetting;
