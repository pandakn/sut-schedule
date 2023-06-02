import { useRef, useState } from "react";
import { CourseDataInterface } from "../models/course.interface";
import {
  AiOutlineSelect,
  AiOutlineDelete,
  AiOutlineCheckCircle,
  AiOutlineClose,
} from "react-icons/ai";
import Alert from "./Alert";
import { IAlert } from "../contexts/StudyPlanContext";

interface IStudyPlan {
  _id: string;
  creator: {
    name: string;
    username: string;
  };
  name: string;
  courseSchedule: CourseDataInterface[];
}

type ModalProp = {
  studyPlan: IStudyPlan[];
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddStudyPlan: (name: string) => Promise<void>;
  handleDeleteStudyPlan: (id: string) => Promise<void>;
  showAlert: IAlert;
  isOpenModal: boolean;
  toggleModal: () => void;
};

const Modal = ({
  studyPlan,
  handleSubmit,
  handleAddStudyPlan,
  handleDeleteStudyPlan,
  showAlert,
  isOpenModal,
  toggleModal,
}: ModalProp) => {
  const [studyPlanName, setStudyPlanName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudyPlanName(value);
  };

  const submit = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    handleAddStudyPlan(studyPlanName);
  };

  return (
    <div className="flex items-center justify-center">
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md mx-auto my-6">
            <div className="relative z-20 text-gray-900 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h2 className="text-2xl font-bold">Study Plan</h2>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={toggleModal}
                >
                  <AiOutlineClose className="w-7 h-7" />
                </button>
              </div>
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
                          onClick={() => handleDeleteStudyPlan(sp._id)}
                          className="px-1 py-2 bg-red-500 rounded hover:bg-red-600"
                        >
                          <AiOutlineDelete className="text-white" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col items-center justify-end w-full p-5 border-t border-gray-200 gap-y-3">
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
                  onClick={submit}
                >
                  Add Plan
                </button>
              </div>
            </div>
            <div>
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
              <div
                className="fixed inset-0 z-10 bg-black/25"
                onClick={toggleModal}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
