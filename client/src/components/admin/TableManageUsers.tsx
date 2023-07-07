import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../../services/httpClientForAdmin";
import { useAuth } from "../../hooks";

// types
import { Users, EditUser as IEditUser } from "./@types/user";

// components
import Modal from "../Modal";
import EditUser from "./EditUser";
import ModalDeleteUser from "./ModalDeleteUser";

// icons
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteUserById } from "../../services/httpClient";

const TableManageUsers = () => {
  const [usersInfo, setUsersInfo] = useState<Users[]>([]);
  const [editUser, setEditUser] = useState<IEditUser>({ id: "", name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModelDeleteOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { accessToken, payload } = useAuth();

  const handleEditUser = (userId: string) => {
    setEditUser({ id: userId });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

  const fetchAllUsers = useCallback(async () => {
    if (accessToken) {
      const res = await getAllUsers(accessToken);
      const data = res.result;
      console.log(data);

      setUsersInfo(data);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <>
      <div className="container relative mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {/* users data */}
          <tbody>
            {usersInfo.map((user) => {
              return (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 "
                >
                  <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                    <div className="pl-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      Online
                    </div>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {/* <!-- Modal toggle --> */}
                    <button
                      // onClick={toggleModal}
                      onClick={() => {
                        handleEditUser(user._id);
                        toggleModal();
                      }}
                      className="bg-blue-500 study-plan-btn hover:bg-blue-600"
                    >
                      <AiOutlineEdit className="text-white" />
                    </button>
                    <button
                      disabled={payload.id === user._id}
                      onClick={() => {
                        setEditUser({ id: user._id, name: user.name });
                        toggleModelDelete();
                      }}
                      className="bg-red-500 study-plan-btn hover:bg-red-600 disabled:opacity-30"
                    >
                      <AiOutlineDelete className="text-white" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <!-- Edit user modal --> */}
      <Modal isOpenModal={isModalOpen}>
        <EditUser
          userId={editUser.id}
          toggleModal={toggleModal}
          setIsModalOpen={setIsModalOpen}
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
