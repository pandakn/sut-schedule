import React, { SetStateAction, useState } from "react";
import FormContainer from "../FormContainer";
import Alert from "../Alert";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { useAuth } from "../../hooks";
import { IRegisterForm } from "../../models/auth.interface";

type AddUserProps = {
  toggleModal: () => void;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
};

const AddUser = ({ toggleModal, setIsModalOpen }: AddUserProps) => {
  const { handleRegister, registered, showAlert } = useAuth();
  const [inputForm, setInputForm] = useState<IRegisterForm>({
    name: "",
    username: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = (event: React.FormEvent) => {
    event.preventDefault();
    handleRegister(inputForm.name, inputForm.username, inputForm.password);

    setTimeout(() => {
      setIsModalOpen(false);
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {/* Alert */}
      {!registered.error && showAlert && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          {registered.message}
        </Alert>
      )}

      {registered.error && showAlert && (
        <Alert
          textColor="#991b1b"
          bgColor="#fef2f2"
          icon={<VscError className="text-xl" />}
        >
          {registered.message}
        </Alert>
      )}

      <FormContainer header="Add User">
        <form className="space-y-6" onSubmit={register}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-bold text-gray-800"
            >
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={inputForm.name}
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
              required
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}
              value={inputForm.username}
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
              required
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={inputForm.password}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onSubmit={register}
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

export default AddUser;
