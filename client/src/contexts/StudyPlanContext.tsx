import React, { createContext, useCallback, useEffect, useState } from "react";
import { CourseDataInterface } from "../models/course.interface";
import { useAuth } from "../hooks";
import {
  getStudyPlanOfUser,
  addCourseToStudyPlan,
  addStudyPlan,
  deleteStudyPlan,
  getUserById,
  getSelectStudyPlan,
} from "../services/httpClient";

export interface IStudyPlanOfUser {
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
  studyPlanOfUser: IStudyPlanOfUser[];
  setStudyPlanOfUser: React.Dispatch<React.SetStateAction<IStudyPlanOfUser[]>>;
  courseInPlanner: CourseDataInterface[];
  setCourseInPlanner: React.Dispatch<
    React.SetStateAction<CourseDataInterface[]>
  >;
  handleChooseStudyPlan: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddCourseToStudyPlan: (
    studyPlanID: string,
    courseSchedule: CourseDataInterface
  ) => Promise<string>;
  handleAddStudyPlan: (name: string) => Promise<void>;
  handleDeleteStudyPlan: (id: string) => Promise<void>;
  selectedPlan: ISelectedPlan;
  showAlert: IAlert;
};

export const StudyPlanContext = createContext<StudyPlanContextType>({
  studyPlanOfUser: [],
  setStudyPlanOfUser: () => {
    throw new Error("setStudyPlanOfUser is not implemented");
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
  const [studyPlanOfUser, setStudyPlanOfUser] = useState<IStudyPlanOfUser[]>(
    []
  );
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

    const selected = studyPlanOfUser.find((plan) => plan._id === value);
    const planID = selected?._id;

    const courseSchedule = selected?.courseSchedule;

    const studyPlanName = selected?.name;

    if (planID && studyPlanName && accessToken && courseSchedule) {
      await getSelectStudyPlan(payload.id, planID, accessToken);

      fetchSelectStudyPlanOfUser();

      setCourseInPlanner(courseSchedule);
      setSelectedPlan({ id: planID, name: studyPlanName });
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

      if (res?.status) {
        setCourseInPlanner((prev) => {
          if (selectedPlan && courseSchedule) {
            return [...prev, courseSchedule];
          }
          return prev;
        });
      } else {
        const errorMsg = res?.data.message;
        return errorMsg;
      }
    }
  };

  const handleAddStudyPlan = async (name: string) => {
    if (name && studyPlanOfUser) {
      setShowAlert({ type: "add", isShow: true });
      const res = await addStudyPlan(payload.id, name, accessToken);
      setStudyPlanOfUser((prev) => {
        return [...prev, res.result];
      });
    }

    setTimeout(() => setShowAlert({ type: "", isShow: false }), 1500);
  };

  const handleDeleteStudyPlan = async (studyPlanID: string) => {
    setShowAlert({ type: "delete", isShow: true });

    setStudyPlanOfUser((prev) => {
      const updatedStudyPlan = prev.filter((sp) => sp._id !== studyPlanID);
      // If  delete the study plan, will go back to first study plan
      const selectedStudyPlan: IStudyPlanOfUser | null =
        updatedStudyPlan.length > 0 ? updatedStudyPlan[0] : null;

      // Set selectedStudyPlan to the state
      selectedStudyPlan &&
        setSelectedPlan({
          id: selectedStudyPlan?._id,
          name: selectedStudyPlan.name,
        });
      return updatedStudyPlan;
    });

    accessToken &&
      (await deleteStudyPlan(payload.id, studyPlanID, accessToken));

    window.location.reload();

    setTimeout(() => setShowAlert({ type: "", isShow: false }), 1500);
  };

  const fetchSelectStudyPlanOfUser = useCallback(async () => {
    if (accessToken) {
      const res = await getUserById(payload.id, accessToken);

      if (res) {
        const studyPlan = res.result.selectedStudyPlan;
        const id = studyPlan._id;
        const name = studyPlan.name;
        const courseSchedule = studyPlan.courseSchedule;
        setCourseInPlanner(courseSchedule);
        setSelectedPlan({ id, name });
      }
    }
  }, [accessToken, payload]);

  // for get select study plan of user
  useEffect(() => {
    fetchSelectStudyPlanOfUser();
  }, [fetchSelectStudyPlanOfUser]);

  const fetchAllStudyPlanOfUser = useCallback(async () => {
    try {
      if (accessToken) {
        const res = await getStudyPlanOfUser(payload.id, accessToken);

        setStudyPlanOfUser(res.result);
      }
    } catch (error) {
      console.error("Failed to fetch study plans:", error);
    }
  }, [accessToken, payload.id]);

  // for get all study plan of user
  useEffect(() => {
    fetchAllStudyPlanOfUser();
  }, [fetchAllStudyPlanOfUser]);

  return (
    <StudyPlanContext.Provider
      value={{
        studyPlanOfUser,
        setStudyPlanOfUser,
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
