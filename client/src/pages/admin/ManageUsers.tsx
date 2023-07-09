import { useUser } from "../../hooks";

// component
import TableManageUsers from "../../components/admin/TableManageUsers";

const ManageUsers = () => {
  const { usersInfo } = useUser();

  return (
    <>
      <TableManageUsers usersInfo={usersInfo} />
    </>
  );
};

export default ManageUsers;
