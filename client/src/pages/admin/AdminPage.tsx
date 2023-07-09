import { useCallback, useEffect, useState } from "react";
import { useAuth, useUser } from "../../hooks";

// services
import { getAllStudyPlans } from "../../services/httpClientForAdmin";

// components
import TotalCard from "../../components/admin/TotalCard";
import {
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineSchedule,
} from "react-icons/ai";

const AdminPage = () => {
  const { accessToken } = useAuth();
  const [totalStudyPlans, setTotalStudyPlans] = useState(0);
  const { totalUser } = useUser();

  const fetchAllStudyPlans = useCallback(async () => {
    if (accessToken) {
      const res = await getAllStudyPlans(accessToken);
      console.log(res);
      setTotalStudyPlans(res.countStudyPlan);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchAllStudyPlans();
  }, [fetchAllStudyPlans]);

  return (
    <div className="flex flex-col justify-around gap-6 md:flex-row">
      <TotalCard
        title="Total Users"
        total={totalUser}
        color="#FAAB78"
        icon={<AiOutlineUser className="totalCard-icon" />}
      />
      <TotalCard
        title="Total Blogs"
        total={5}
        color="#8294C4"
        icon={<AiOutlineBook className="totalCard-icon" />}
      />
      <TotalCard
        title="Total Study plans"
        total={totalStudyPlans}
        color="#A4BC92"
        icon={<AiOutlineSchedule className="totalCard-icon" />}
      />
    </div>
  );
};

export default AdminPage;
