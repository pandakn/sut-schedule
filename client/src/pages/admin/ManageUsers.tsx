import { useUser } from "../../hooks";

// component
import PaginatedUsers from "../../components/admin/PaginatedUsers";

const ManageUsers = () => {
  const { usersInfo } = useUser();

  return (
    <>
      <PaginatedUsers data={usersInfo} itemsPerPage={6} />
    </>
  );
};

export default ManageUsers;
