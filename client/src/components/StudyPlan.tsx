import React, { useRef, useState } from "react";

import Modal from "./Modal";

import { CourseDataInterface } from "../models/course.interface";

import {
  AiOutlineDelete,
  AiOutlineSelect,
  AiOutlineSave,
  AiOutlineEdit,
  AiOutlineClose,
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
  handleEditStudyPlan: (id: string, name: string) => Promise<void>;
  handleDeleteStudyPlan: (id: string) => Promise<void>;
};

const StudyPlan = ({
  studyPlan,
  handleSubmit,
  handleAddStudyPlan,
  handleEditStudyPlan,
  handleDeleteStudyPlan,
}: StudyPlanProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyPlanName, setStudyPlanName] = useState("");
  const [detectedStudyPlanName, setDetectedStudyPlanName] = useState("");
  const [showInputField, setShowInputField] = useState(false);
  const [chooseStudyPlan, setChooseStudyPlan] = useState("");
  const [studyPlanNewName, setStudyPlanNewName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudyPlanName(value);
  };

  const handleEditStudyPlanName = (id: string, name: string) => {
    handleEditStudyPlan(id, name);
    setTimeout(() => {
      window.location.reload();
      setShowInputField(false);
    }, 1000);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
    await handleAddStudyPlan(studyPlanName);
  };

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    const id = e.currentTarget.value;
    name && setDetectedStudyPlanName(name);
    setIsModalOpen(!isModalOpen);
    setChooseStudyPlan(id);
  };

  return (
    <>
      <div className="relative flex-auto p-6">
        {studyPlan.map((sp) => {
          return (
            <div
              key={sp._id + sp.name}
              className="flex items-center w-72 sm:w-80 md:w-96"
            >
              {/* study plan name */}
              <div className="flex-1 my-2 text-lg leading-relaxed text-gray-700">
                {showInputField ? (
                  <input
                    onChange={(e) => setStudyPlanNewName(e.target.value)}
                    disabled={chooseStudyPlan !== sp._id}
                    placeholder={sp.name}
                    className="pl-1 border border-orange-500 rounded disabled:border-none disabled:bg-white disabled:opacity-100 focus:outline-orange-600"
                  />
                ) : (
                  <p>{sp.name}</p>
                )}
              </div>

              {/* button */}
              <div className="flex gap-x-2">
                {showInputField ? (
                  <>
                    {/* button update */}
                    <button
                      disabled={studyPlanNewName === ""}
                      name={sp.name}
                      value={sp._id}
                      onClick={() =>
                        handleEditStudyPlanName(
                          chooseStudyPlan,
                          studyPlanNewName
                        )
                      }
                      className={`study-plan-btn bg-green-500  hover:bg-green-600 ${
                        chooseStudyPlan !== sp._id && "hidden"
                      } disabled:opacity-60`}
                    >
                      <AiOutlineSave className="text-white" />
                    </button>
                    {/* cancel btn */}
                    <button
                      name={sp.name}
                      value={sp._id}
                      onClick={() => setShowInputField(false)}
                      className={`study-plan-btn bg-red-500  hover:bg-red-600 ${
                        chooseStudyPlan !== sp._id && "hidden"
                      }`}
                    >
                      <AiOutlineClose className="text-white" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      name={sp.name}
                      value={sp._id}
                      onClick={handleSubmit}
                      className="bg-green-500 study-plan-btn hover:bg-green-600"
                    >
                      <AiOutlineSelect className="text-white" />
                    </button>
                    <button
                      name={sp.name}
                      value={sp._id}
                      onClick={() => {
                        setShowInputField(true);
                        setChooseStudyPlan(sp._id);
                      }}
                      className="bg-blue-500 study-plan-btn hover:bg-blue-600"
                    >
                      <AiOutlineEdit className="text-white" />
                    </button>
                    <button
                      disabled={studyPlan.length <= 1}
                      name={sp.name}
                      value={sp._id}
                      onClick={(e) => toggleModal(e)}
                      className="bg-red-500 study-plan-btn hover:bg-red-600 disabled:opacity-40"
                    >
                      <AiOutlineDelete className="text-white" />
                    </button>
                  </>
                )}
              </div>

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
                    onClick={() => handleDeleteStudyPlan(chooseStudyPlan)}
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
