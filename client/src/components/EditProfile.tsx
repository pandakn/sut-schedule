import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks";

// components
import FormContainer from "./FormContainer";

// services
import { getUserById, updateUserProfile } from "../services/httpClient";
import toast from "react-hot-toast";

interface IEditProfile {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

type EditProfileProps = {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
};

const EditProfile = ({ toggleModal, setIsModalOpen }: EditProfileProps) => {
  const { accessToken, payload, setPayload } = useAuth();
  const [userProfile, setUserProfile] = useState<IEditProfile>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const fetchUserProfile = useCallback(async () => {
    if (accessToken) {
      const res = await getUserById(payload.id, accessToken);

      if (res) {
        const data = res.result;
        setUserProfile((prev) => {
          return { ...prev, name: data.name, username: data.username };
        });
      }
    }
  }, [accessToken, payload]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  const submitEditProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (userProfile.password.length < 6) {
      setError("Password must have at least 6 characters");
      toast.error("Password must have at least 6 characters", {
        duration: 1500,
      });
      return;
    }

    if (userProfile.password !== userProfile.confirmPassword) {
      setError("Password and confirm password do not match");
      toast.error("Password and confirm password do not match", {
        duration: 1500,
      });
      return;
    }

    if (accessToken) {
      const res = await updateUserProfile(
        accessToken,
        payload.id,
        userProfile.name,
        userProfile.username,
        userProfile.password
      );
      const data = res?.data;

      setPayload((prev) => {
        const updatedPayload = {
          ...prev,
          name: data.name,
          username: data.username,
        };

        return updatedPayload;
      });
    }

    toast.success("Updated successfully");

    setTimeout(() => {
      setIsModalOpen(false);
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <FormContainer header="Edit Profile">
      {/* <div className="w-[300px] p-6"> */}
      <form className="w-full space-y-6" onSubmit={submitEditProfile}>
        <div>
          <label htmlFor="name" className="block mb-2 font-bold text-gray-800">
            Name
          </label>
          <input
            onChange={handleInputChange}
            value={userProfile.name}
            required
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 font-bold text-gray-800"
          >
            Username
          </label>
          <input
            onChange={handleInputChange}
            value={userProfile.username}
            required
            type="text"
            id="username"
            name="username"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-800"
          >
            Password
          </label>
          <input
            onChange={handleInputChange}
            required
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="password"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-800"
          >
            Confirm Password
          </label>
          <input
            onChange={handleInputChange}
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="confirm password"
          />
          {error && <p className="mt-1 text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <button
            onSubmit={submitEditProfile}
            type="submit"
            className="px-6 py-2 text-lg font-medium text-white uppercase bg-gray-900 rounded-3xl hover:bg-gray-900/75"
          >
            Save
          </button>
          <p
            onClick={toggleModal}
            className="px-4 py-2 text-lg font-medium text-gray-900 uppercase border border-gray-800 rounded-3xl hover:text-gray-600 hover:cursor-pointer"
          >
            Cancel
          </p>
        </div>
      </form>
      {/* </div> */}
    </FormContainer>
  );
};

export default EditProfile;
