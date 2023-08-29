import { useCallback, useEffect, useState } from "react";
import { useAuth, useUser } from "../../hooks";

// services
import { getAllStudyPlans } from "../../services/httpClientForAdmin";
import { getBlogs } from "../../services/blog";

// components
import TotalCard from "../../components/admin/TotalCard";
import {
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineSchedule,
} from "react-icons/ai";
import ConfigSetting from "../../components/admin/ConfigSetting";
import BarChartPopularTags from "../../components/admin/BarChartPopularTags";
import BarChartPopularCourses from "../../components/admin/BarChartPopularCourses";
import Modal from "../../components/Modal";

const AdminPage = () => {
  const { accessToken } = useAuth();
  const { totalUser } = useUser();
  const [totalStudyPlans, setTotalStudyPlans] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const fetchAllBlogs = useCallback(async () => {
    if (accessToken) {
      const res = await getBlogs();
      const countBlogs = res?.data.result.length;
      setTotalBlogs(countBlogs);
    }
  }, [accessToken]);

  const fetchAllStudyPlans = useCallback(async () => {
    if (accessToken) {
      const res = await getAllStudyPlans(accessToken);
      setTotalStudyPlans(res.countStudyPlan);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchAllStudyPlans();
    fetchAllBlogs();
  }, [fetchAllStudyPlans, fetchAllBlogs]);

  return (
    <>
      <div className="flex flex-col justify-around gap-6 md:flex-row">
        <TotalCard
          title="Total Users"
          total={totalUser}
          color="#FAAB78"
          icon={<AiOutlineUser className="totalCard-icon" />}
        />
        <TotalCard
          title="Total Blogs"
          total={totalBlogs}
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
      <button
        onClick={toggleModal}
        type="submit"
        className="px-6 py-2 mt-10 font-medium tracking-wide text-white bg-orange-600 rounded-xl hover:bg-orange-400"
      >
        Config Logo
      </button>

      <BarChartPopularCourses />
      <BarChartPopularTags />

      <Modal isOpenModal={isModalOpen} toggleModal={toggleModal}>
        <ConfigSetting />
      </Modal>
    </>
  );
};

export default AdminPage;
