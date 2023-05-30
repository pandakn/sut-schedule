import React, { createContext, useCallback, useEffect, useState } from "react";
import { CourseDataInterface } from "../models/course.interface";
import { useAuth } from "../hooks";
import {
  getStudyPlanOfUser,
  addCourseToStudyPlan,
  addStudyPlan,
  deleteStudyPlan,
} from "../services/httpClient";
import { setDataToLocalStorage } from "../utils/setLocalStorage";

interface IStudyPlan {
  _id: string;
  creator: {
    name: string;
    username: string;
  };
  name: string;
  courseSchedule: CourseDataInterface[];
}

interface ISelectedPlan {
  id: string;
  name: string;
}

export interface IAlert {
  type: "add" | "delete" | "";
  isShow: boolean;
}

interface StudyPlanProviderProps {
  children: React.ReactNode;
}

export type StudyPlanContextType = {
  studyPlan: IStudyPlan[];
  setStudyPlan: React.Dispatch<React.SetStateAction<IStudyPlan[]>>;
  courseInPlanner: CourseDataInterface[];
  setCourseInPlanner: React.Dispatch<
    React.SetStateAction<CourseDataInterface[]>
  >;
  handleChooseStudyPlan: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddCourseToStudyPlan: (
    studyPlanID: string,
    courseSchedule: CourseDataInterface
  ) => Promise<void>;
  handleAddStudyPlan: (name: string) => Promise<void>;
  handleDeleteStudyPlan: (id: string) => Promise<void>;
  selectedPlan: ISelectedPlan;
  showAlert: IAlert;
};

export const StudyPlanContext = createContext<StudyPlanContextType>({
  studyPlan: [],
  setStudyPlan: () => {
    throw new Error("setStudyPlan is not implemented");
  },
  courseInPlanner: [],
  setCourseInPlanner: () => {
    throw new Error("setCourseInPlanner is not implemented");
  },
  handleChooseStudyPlan: () => {
    throw new Error("handleChooseStudyPlan is not implemented");
  },
  handleAddCourseToStudyPlan: async () => {
    throw new Error("handleAddCourseToStudyPlan is not implemented");
  },
  handleAddStudyPlan: async () => {
    throw new Error("handleAddStudyPlan is not implemented");
  },
  handleDeleteStudyPlan: async () => {
    throw new Error("handleDeleteStudyPlan is not implemented");
  },
  selectedPlan: { id: "", name: "" },
  showAlert: { type: "", isShow: false },
});

export const StudyPlanProvider = ({ children }: StudyPlanProviderProps) => {
  const [studyPlan, setStudyPlan] = useState<IStudyPlan[]>([]);
  const [courseInPlanner, setCourseInPlanner] = useState<CourseDataInterface[]>(
    []
  );
  const [selectedPlan, setSelectedPlan] = useState<ISelectedPlan>({
    id: "",
    name: "",
  });
  const [showAlert, setShowAlert] = useState<IAlert>({
    type: "",
    isShow: false,
  });

  const { accessToken, payload } = useAuth();

  const handleChooseStudyPlan = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const button = event.currentTarget as HTMLButtonElement;
    const value = button.value;
    const selected = studyPlan.find((plan) => plan._id === value);
    const planID = selected?._id;
    const courseSchedule = selected?.courseSchedule;
    const studyPlanName = selected?.name;

    if (selectedPlan.id !== planID) {
      studyPlanName &&
        planID &&
        setSelectedPlan({ id: planID, name: studyPlanName });

      setCourseInPlanner((prev) => {
        if (selectedPlan && courseSchedule) {
          return [...courseSchedule];
        }
        return prev;
      });

      // Update localStorage only when a new plan is selected
      setDataToLocalStorage(planID, studyPlanName, courseSchedule);
    }
  };

  const handleAddCourseToStudyPlan = async (
    studyPlanID: string,
    courseSchedule: CourseDataInterface
  ) => {
    if (accessToken) {
      const res = await addCourseToStudyPlan(
        payload.id,
        studyPlanID,
        courseSchedule,
        accessToken
      );
      const selected = studyPlan.find((plan) => plan._id === studyPlanID);
      const planID = selected?._id;
      const studyPlanName = selected?.name;
      const course = res.studyPlan.courseSchedule;

      if (res) {
        setCourseInPlanner((prev) => {
          if (selectedPlan && courseSchedule) {
            return [...prev, courseSchedule];
          }
          return prev;
        });
        setDataToLocalStorage(planID, studyPlanName, course);
      }
    }
  };

  const handleAddStudyPlan = async (name: string) => {
    if (name && studyPlan) {
      setShowAlert({ type: "add", isShow: true });
      const res = await addStudyPlan(payload.id, name, accessToken);
      setStudyPlan((prev) => {
        return [...prev, res.result];
      });
    }

    setTimeout(() => setShowAlert({ type: "", isShow: false }), 1500);
  };

  const handleDeleteStudyPlan = async (id: string) => {
    setShowAlert({ type: "delete", isShow: true });

    setStudyPlan((prev) => {
      const updatedStudyPlan = prev.filter((sp) => sp._id !== id);
      // If  delete the study plan, will go back to first study plan
      const selectedStudyPlan: IStudyPlan | null =
        updatedStudyPlan.length > 0 ? updatedStudyPlan[0] : null;

      // Set selectedStudyPlan to the state
      selectedStudyPlan &&
        setSelectedPlan({
          id: selectedStudyPlan?._id,
          name: selectedStudyPlan.name,
        });

      setDataToLocalStorage(
        selectedStudyPlan?._id,
        selectedStudyPlan?.name,
        selectedStudyPlan?.courseSchedule
      );
      return updatedStudyPlan;
    });
    await deleteStudyPlan(id, accessToken);
    window.location.reload();

    setTimeout(() => setShowAlert({ type: "", isShow: false }), 1500);
  };

  const fetchStudyPlan = useCallback(async () => {
    try {
      if (accessToken) {
        const res = await getStudyPlanOfUser(payload.id, accessToken);

        setStudyPlan(res.result);
      }
    } catch (error) {
      console.error("Failed to fetch study plans:", error);
    }
  }, [accessToken, payload.id]);

  // Load the selected value from localStorage on component mount
  useEffect(() => {
    // Load study plan from local storage
    const studyPlanFromStorage = localStorage.getItem("studyPlan");
    if (studyPlanFromStorage) {
      setCourseInPlanner(JSON.parse(studyPlanFromStorage));
    }
    const storedValue = localStorage.getItem("selectedPlan");
    if (storedValue) {
      setSelectedPlan(JSON.parse(storedValue));
    }
  }, []);

  useEffect(() => {
    fetchStudyPlan();
  }, [fetchStudyPlan]);

  return (
    <StudyPlanContext.Provider
      value={{
        studyPlan,
        setStudyPlan,
        courseInPlanner,
        setCourseInPlanner,
        selectedPlan,
        handleChooseStudyPlan,
        handleAddCourseToStudyPlan,
        handleAddStudyPlan,
        handleDeleteStudyPlan,
        showAlert,
      }}
    >
      {children}
    </StudyPlanContext.Provider>
  );
};
