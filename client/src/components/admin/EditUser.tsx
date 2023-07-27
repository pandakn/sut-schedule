import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { editUserProfile, getUserById } from "../../services/httpClient";
import FormContainer from "../FormContainer";
import Alert from "../Alert";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { EditUser as IEditUser, Role } from "./@types/user";

interface IEditProfile {
  name: string;
  username?: string;
  role: Role;
  maximumStudyPlans: number;
}

type EditUserProps = {
  user: IEditUser;
  toggleModal: () => void;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
};

const roles = ["admin", "user"];

const EditUser = ({ user, toggleModal, setIsModalOpen }: EditUserProps) => {
  const { accessToken, payload, setPayload } = useAuth();
  const [userProfile, setUserProfile] = useState<IEditProfile>({
    name: "",
    username: "",
    role: "user",
    maximumStudyPlans: 0,
    // password: "",
    // confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    if (accessToken) {
      const res = await getUserById(user.id, accessToken);

      if (res) {
        const data = res.result;
        setUserProfile((prev) => {
          return {
            ...prev,
            name: data.name,
            username: data.username,
            role: data.role,
            maximumStudyPlans: data.maximumStudyPlans,
          };
        });
      }
    }
  }, [accessToken, user.id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  const submitEditProfile = async (event: React.FormEvent) => {
    event.preventDefault();

    if (accessToken) {
      const res = await editUserProfile(
        // payload.id,
        accessToken,
        user.id,
        userProfile.name,
        userProfile.role,
        userProfile.maximumStudyPlans
      );

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
            role: data.role,
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
          <div className="flex flex-col gap-2 md:flex-row">
            {/* name */}
            <div className="w-full">
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
                className="w-full p-2 border border-gray-300 rounded-lg "
                placeholder="Enter your name"
              />
            </div>
            <section className="flex w-full gap-2">
              {/* role */}
              <div className="w-full">
                <label
                  htmlFor="role"
                  className="block mb-2 font-bold text-gray-800"
                >
                  Role
                </label>
                <select
                  defaultValue={user.role}
                  name="role"
                  id="role"
                  onChange={handleSelectChange}
                  className="w-full combobox-search"
                >
                  {roles.map((role, idx) => {
                    return (
                      <option key={idx} value={role}>
                        {role}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* max study plans */}
              <div className="w-full">
                <label
                  htmlFor="maximumStudyPlans"
                  className="block mb-2 font-bold text-gray-800"
                >
                  Max. Plan
                </label>
                <input
                  min={1}
                  onChange={handleInputChange}
                  value={userProfile.maximumStudyPlans}
                  required
                  type="number"
                  id="maximumStudyPlans"
                  name="maximumStudyPlans"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Max. Plan"
                />
                <p className="mt-1 text-red-500">{error}</p>
              </div>
            </section>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onSubmit={submitEditProfile}
              type="submit"
              className="px-6 py-2 font-medium text-white uppercase bg-gray-900 rounded-3xl hover:bg-gray-900/75"
            >
              Save
            </button>
            <p
              onClick={toggleModal}
              className="px-4 py-2 font-medium text-gray-900 uppercase border border-gray-800 rounded-3xl hover:text-gray-600 hover:cursor-pointer"
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
