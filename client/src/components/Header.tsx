import { useState } from "react";
import { useStudyPlan } from "../hooks";

import Modal from "./Modal";
import StudyPlan from "./StudyPlan";
import Button from "./Button";

type HeaderProps = {
  studyPlanName: string;
};

const Header = ({ studyPlanName }: HeaderProps) => {
  const {
    studyPlanOfUser,
    handleChooseStudyPlan,
    handleAddStudyPlan,
    handleEditStudyPlan,
    handleDeleteStudyPlan,
  } = useStudyPlan();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <header className="container flex flex-col items-center justify-between gap-3 p-5 mx-auto mt-4 md:flex-row">
        <h3 className="text-xl text-gray-800 md:text-4xl">{studyPlanName}</h3>
        <Button
          className="px-4 py-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
          onClick={toggleModal}
        >
          Choose a plan
        </Button>
      </header>
      <Modal
        showHeader={true}
        title="Study Plan"
        isOpenModal={isModalOpen}
        toggleModal={toggleModal}
      >
        <StudyPlan
          studyPlan={studyPlanOfUser}
          handleSubmit={handleChooseStudyPlan}
          handleAddStudyPlan={handleAddStudyPlan}
          handleEditStudyPlan={handleEditStudyPlan}
          handleDeleteStudyPlan={handleDeleteStudyPlan}
        />
      </Modal>
    </>
  );
};

export default Header;
