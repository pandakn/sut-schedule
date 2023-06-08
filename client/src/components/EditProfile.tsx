import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks";

// components
import Alert from "./Alert";
import FormContainer from "./FormContainer";

// services
import { getUserById, updateUserProfile } from "../services/httpClient";
import { VscError } from "react-icons/vsc";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface IEditProfile {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const EditProfile = () => {
  const { accessToken, payload, setPayload } = useAuth();
  const [userProfile, setUserProfile] = useState<IEditProfile>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      window.location.href = "/";
    }, 1500);
    if (userProfile.password !== userProfile.confirmPassword) {
      setError("Password and confirm password do not match");

      return;
    }

    if (accessToken) {
      const res = await updateUserProfile(
        payload.id,
        userProfile.name,
        userProfile.username,
        userProfile.password,
        accessToken
      );
      const data = res.result;

      setPayload((prev) => {
        const updatedPayload = {
          ...prev,
          name: data.name,
          username: data.username,
        };
        localStorage.setItem("payload", JSON.stringify(updatedPayload));
        return updatedPayload;
      });
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <>
      {/* Alert */}
      {!error && showAlert && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          Updated successfully
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
      <FormContainer header="Edit Profile">
        <form className="space-y-6" onSubmit={submitEditProfile}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-bold text-gray-800"
            >
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
          <div>
            <button
              onSubmit={submitEditProfile}
              type="submit"
              className="w-full px-6 py-2 text-xl font-medium text-white uppercase bg-black rounded-3xl"
            >
              Save
            </button>
          </div>
        </form>
      </FormContainer>
    </>
  );
};

export default EditProfile;
