import { SetStateAction, useState } from "react";
import { useAuth } from "../../hooks";

// types
import { Users, EditUser as IEditUser } from "./@types/user";

// components
import Modal from "../Modal";
import EditUser from "./EditUser";
import ModalDeleteUser from "./ModalDeleteUser";

// icons
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import { deleteUserById } from "../../services/httpClient";
import AddUser from "./AddUser";

const tableHeader = ["name", "role", "max. plans", "action"];

type TableManageUsersProps = {
  usersData: Users[];
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
};

const TableManageUsers = ({
  usersData,
  searchQuery,
  setSearchQuery,
  onSearchChange,
}: TableManageUsersProps) => {
  const [editUser, setEditUser] = useState<IEditUser>({
    id: "",
    name: "",
    role: "user",
    maximumStudyPlans: 0,
  });
  const { accessToken, payload } = useAuth();
  const [isModalEditUser, setIsModalEditUser] = useState(false);
  const [isModalDeleteOpen, setIsModelDeleteOpen] = useState(false);
  const [isModalAddUser, setIsModalAddUser] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleEditUser = (
    userId: string,
    role: "admin" | "user",
    maximumStudyPlans: number
  ) => {
    setEditUser({ id: userId, role, maximumStudyPlans });
  };

  const toggleModalEditUser = () => {
    setIsModalEditUser(!isModalEditUser);
  };

  const toggleModalAddUser = () => {
    setIsModalAddUser(!isModalAddUser);
  };

  const toggleModelDelete = () => {
    setIsModelDeleteOpen(!isModalDeleteOpen);
  };

  const handleDeleteUser = async () => {
    if (accessToken) {
      const res = await deleteUserById(editUser.id, accessToken);
      if (res) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setIsModelDeleteOpen(false);
          window.location.reload();
        }, 1000);
      }
    }
  };

  return (
    <>
      <div className="container relative mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between py-4 bg-white">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-5 h-5" />
            </div>
            <input
              onChange={onSearchChange}
              type="text"
              value={searchQuery}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-gray-500 focus:outline-none"
              placeholder="Search for users"
            />
            {searchQuery && (
              <div
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
              >
                <AiOutlineClose className="w-4 h-4 text-red-500" />
              </div>
            )}
          </div>

          {/* btn */}
          <button
            className="px-4 py-2 font-bold text-white bg-orange-500 rounded-lg disabled:opacity-50 hover:bg-orange-400"
            onClick={toggleModalAddUser}
          >
            Add User
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {tableHeader.map((header, idx) => (
                <th key={idx} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {/* users data */}
          <tbody>
            {usersData.map((user) => {
              return (
                <tr
                  key={user._id}
                  className="bg-white border-b text dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 "
                >
                  <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                    <div className="">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </th>
                  <td className="py-6 capitalize px-7">{user.role} </td>
                  <td className="py-4 capitalize px-9">
                    {user.maximumStudyPlans}{" "}
                    {user.maximumStudyPlans <= 1 ? "Plan" : "Plans"}
                  </td>

                  <td className="px-6 py-4 space-x-2 ">
                    <div className="flex gap-2">
                      {/* <!-- Modal toggle --> */}
                      <button
                        // onClick={toggleModal}
                        onClick={() => {
                          handleEditUser(
                            user._id,
                            user.role,
                            user.maximumStudyPlans
                          );
                          toggleModalEditUser();
                        }}
                        className="bg-blue-500 study-plan-btn hover:bg-blue-600"
                      >
                        <AiOutlineEdit className="text-white" />
                      </button>
                      <button
                        disabled={payload.id === user._id}
                        onClick={() => {
                          setEditUser({
                            id: user._id,
                            name: user.name,
                            role: user.role,
                            maximumStudyPlans: user.maximumStudyPlans,
                          });
                          toggleModelDelete();
                        }}
                        className="bg-red-500 study-plan-btn hover:bg-red-600 disabled:opacity-30"
                      >
                        <AiOutlineDelete className="text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <!-- Edit user modal --> */}
      <Modal isOpenModal={isModalEditUser}>
        <EditUser
          user={editUser}
          toggleModal={toggleModalEditUser}
          setIsModalOpen={setIsModalEditUser}
        />
      </Modal>

      <Modal isOpenModal={isModalAddUser}>
        <AddUser
          toggleModal={toggleModalAddUser}
          setIsModalOpen={setIsModalAddUser}
        />
      </Modal>

      {/* Modal delete user */}
      <ModalDeleteUser
        name={editUser.name}
        isModalDeleteOpen={isModalDeleteOpen}
        toggleModelDelete={toggleModelDelete}
        handleDelete={handleDeleteUser}
        showAlert={showAlert}
      />
    </>
  );
};

export default TableManageUsers;
