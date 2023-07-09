import { useEffect, useState } from "react";
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

const tableHeader = ["name", "role", "status", "action"];

type TableManageUsersProps = {
  usersInfo: Users[];
};

const TableManageUsers = ({ usersInfo }: TableManageUsersProps) => {
  const [editUser, setEditUser] = useState<IEditUser>({ id: "", name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModelDeleteOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [search, setSearch] = useState("");
  const [filterUsersInfo, setFilterUsersInfo] = useState<Users[]>(usersInfo);
  const { accessToken, payload } = useAuth();

  useEffect(() => {
    const newFilteredUser = usersInfo.filter((user) => {
      return user.name.toLocaleLowerCase().includes(search);
    });

    setFilterUsersInfo(newFilteredUser);
  }, [usersInfo, search]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearch(searchFieldString);
  };

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

  return (
    <>
      <div className="container relative mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center py-4 bg-white">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-5 h-5" />
            </div>
            <input
              onChange={onSearchChange}
              type="text"
              value={search}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-gray-500 focus:outline-none"
              placeholder="Search for users"
            />
            {search && (
              <div
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
              >
                <AiOutlineClose className="w-4 h-4 text-red-500" />
              </div>
            )}
          </div>
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
            {filterUsersInfo.map((user) => {
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
