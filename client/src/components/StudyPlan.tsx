import React, { useRef, useState } from "react";

import Alert from "./Alert";
import Modal from "./Modal";

import { CourseDataInterface } from "../models/course.interface";
import { IAlert } from "../contexts/StudyPlanContext";

import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineSelect,
} from "react-icons/ai";

import { FiTrash2 } from "react-icons/fi";

interface IStudyPlan {
  _id: string;
  creator: {
    name: string;
    username: string;
  };
  name: string;
  courseSchedule: CourseDataInterface[];
}

type StudyPlanProps = {
  studyPlan: IStudyPlan[];
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddStudyPlan: (name: string) => Promise<void>;
  handleDeleteStudyPlan: (id: string) => Promise<void>;
  showAlert: IAlert;
};

const StudyPlan = ({
  studyPlan,
  handleSubmit,
  handleAddStudyPlan,
  handleDeleteStudyPlan,
  showAlert,
}: StudyPlanProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyPlanName, setStudyPlanName] = useState("");
  const [detectedStudyPlanName, setDetectedStudyPlanName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudyPlanName(value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
    handleAddStudyPlan(studyPlanName);
  };

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    name && setDetectedStudyPlanName(name);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Alert */}
      {showAlert.isShow && showAlert.type === "add" && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          Study Plan added successfully
        </Alert>
      )}
      {showAlert.isShow && showAlert.type === "delete" && (
        <Alert
          textColor="#991b1b"
          bgColor="#fef2f2"
          icon={<AiOutlineDelete className="text-xl" />}
        >
          Study Plan deleted successfully
        </Alert>
      )}

      <div className="relative flex-auto p-6">
        {studyPlan.map((sp) => {
          return (
            <div key={sp._id} className="flex items-center w-80">
              <p className="flex-1 my-2 text-lg leading-relaxed text-gray-700">
                {sp.name}
              </p>
              <div className="flex gap-x-2">
                <button
                  name={sp.name}
                  value={sp._id}
                  onClick={handleSubmit}
                  className="px-1 py-2 bg-green-500 rounded hover:bg-green-600"
                >
                  <AiOutlineSelect className="text-white" />
                </button>
                <button
                  name={sp.name}
                  value={sp._id}
                  onClick={(e) => toggleModal(e)}
                  className="px-1 py-2 bg-red-500 rounded hover:bg-red-600"
                >
                  <AiOutlineDelete className="text-white" />
                </button>

                <Modal isOpenModal={isModalOpen}>
                  <div className="p-6 text-center">
                    <FiTrash2 size={56} className="w-full mb-2 text-red-500" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                      Are you sure you want to delete this plan <br />
                      <span className="font-extrabold text-gray-700">
                        {detectedStudyPlanName}
                      </span>
                      ?
                    </h3>
                    <button
                      onClick={() => handleDeleteStudyPlan(sp._id)}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={submit}
        className="flex flex-col items-center justify-end w-full p-5 border-t border-gray-200 gap-y-3"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Study Plan..."
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
        />
        <button
          disabled={!studyPlanName && true}
          className="w-full px-4 py-2 font-bold text-white capitalize bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
          onSubmit={submit}
        >
          Add Plan
        </button>
      </form>
    </>
  );
};

export default StudyPlan;
