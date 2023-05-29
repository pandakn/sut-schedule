import { useState } from "react";
import { CourseDataInterface } from "../models/course.interface";

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
};

const Modal = ({ studyPlan, handleSubmit }: ModalProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={toggleModal}
      >
        Choose Plan
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md mx-auto my-6">
            <div className="relative z-20 text-gray-900 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h2 className="text-2xl font-bold">Modal Title</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                  onClick={toggleModal}
                >
                  X
                </button>
              </div>

              <div className="relative flex-auto p-6">
                {studyPlan.map((sp) => {
                  return (
                    <div key={sp._id} className="flex items-center w-80">
                      <p className="flex-1 my-2 text-lg leading-relaxed text-gray-700">
                        {sp.name}
                      </p>
                      <button
                        name={sp.name}
                        value={sp._id}
                        onClick={handleSubmit}
                        className="px-1 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Choose
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-end w-full p-5 border-t border-gray-200">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
            <div
              className="fixed inset-0 z-10 bg-black opacity-25"
              onClick={toggleModal}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
