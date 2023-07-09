import { useUser } from "../../hooks";

// components
import TotalCard from "../../components/admin/TotalCard";
import { AiOutlineUser, AiOutlineBook } from "react-icons/ai";

const AdminPage = () => {
  const { totalUser } = useUser();

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <TotalCard
        title="Total Users"
        total={totalUser}
        color="#FAAB78"
        icon={<AiOutlineUser className="w-6 h-6 text-gray-900" />}
      />
      <TotalCard
        title="Total Blogs"
        total={5}
        color="#8294C4"
        icon={<AiOutlineBook className="w-6 h-6 text-gray-900" />}
      />
    </div>
  );
};

export default AdminPage;
