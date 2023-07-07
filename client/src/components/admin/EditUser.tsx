import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { getUserById, updateUserProfile } from "../../services/httpClient";
import FormContainer from "../FormContainer";
import Alert from "../Alert";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";

interface IEditProfile {
  name: string;
  username?: string;
}

interface EditUserProps {
  userId: string;
  toggleModal: () => void;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const EditUser = ({ userId, toggleModal, setIsModalOpen }: EditUserProps) => {
  const { accessToken, payload, setPayload } = useAuth();
  const [userProfile, setUserProfile] = useState<IEditProfile>({
    name: "",
    username: "",
    // password: "",
    // confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    if (accessToken) {
      const res = await getUserById(userId, accessToken);

      if (res) {
        const data = res.result;
        setUserProfile((prev) => {
          return { ...prev, name: data.name, username: data.username };
        });
      }
    }
  }, [accessToken, userId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  const submitEditProfile = async (event: React.FormEvent) => {
    event.preventDefault();

    if (accessToken) {
      const res = await updateUserProfile(
        // payload.id,
        accessToken,
        userId,
        userProfile.name,
        userProfile.username
      );

      console.log(res);

      // handle error
      if (!res?.status) {
        setError(res?.data.message);
        return;
      }

      const data = res?.data;

      setPayload((prev) => {
        setShowAlert(true);
        setError("");
        if (data._id === payload.id) {
          const updatedPayload = {
            ...prev,
            name: data.name,
            username: data.username,
          };

          localStorage.setItem("payload", JSON.stringify(updatedPayload));

          return updatedPayload;
        }

        return prev;
      });
    }

    setTimeout(() => {
      setShowAlert(false);
      setIsModalOpen(false);
      window.location.reload();
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

      <FormContainer header="Edit User">
        <form className="w-full space-y-6" onSubmit={submitEditProfile}>
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
            <p className="mt-1 text-red-500">{error}</p>
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
      </FormContainer>
    </>
  );
};

export default EditUser;
