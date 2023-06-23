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
  editStudyPlan,
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
  type: "add" | "delete" | "update" | "";
  isShow: boolean;
}

interface StudyPlanProviderProps {
  children: React.ReactNode;
}

export type StudyPlanContextType = {
  studyPlanOfUser: IStudyPlanOfUser[];
  courseInPlanner: CourseDataInterface[];
  setCourseInPlanner: React.Dispatch<
    React.SetStateAction<CourseDataInterface[]>
  >;
  handleChooseStudyPlan: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddCourseToStudyPlan: (
    studyPlanID: string,
    courseSchedule: CourseDataInterface
  ) => Promise<string>;
  handleAddStudyPlan: (name: string) => Promise<string>;
  handleEditStudyPlan: (id: string, name: string) => Promise<void>;
  handleDeleteStudyPlan: (id: string) => Promise<void>;
  selectedPlan: ISelectedPlan;
  showAlert: IAlert;
};

export const StudyPlanContext = createContext<StudyPlanContextType>({
  studyPlanOfUser: [],
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
  handleEditStudyPlan: async () => {
    throw new Error("handleEditStudyPlan is not implemented");
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

      setTimeout(() => setShowAlert({ type: "", isShow: false }), 1500);
      if (res?.status) {
        setStudyPlanOfUser((prev) => {
          return [...prev, res.data.result];
        });
      } else {
        return res?.data.message;
      }
    }
  };

  const handleEditStudyPlan = async (studyPlanID: string, name: string) => {
    setShowAlert({ type: "update", isShow: true });

    if (accessToken) {
      const res = await editStudyPlan(studyPlanID, name, accessToken);

      if (res) {
        setStudyPlanOfUser((prev) => {
          const updatedStudyPlan = prev.map((sp) =>
            sp._id === studyPlanID ? { ...sp, name } : sp
          );

          return updatedStudyPlan;
        });
      }
    }

    setTimeout(() => setShowAlert({ type: "", isShow: false }), 1000);
  };

  const handleDeleteStudyPlan = async (studyPlanID: string) => {
    setShowAlert({ type: "delete", isShow: true });
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
    if (accessToken) {
      const res = await getStudyPlanOfUser(payload.id, accessToken);

      res && setStudyPlanOfUser(res.result);
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
        courseInPlanner,
        setCourseInPlanner,
        selectedPlan,
        handleChooseStudyPlan,
        handleAddCourseToStudyPlan,
        handleAddStudyPlan,
        handleEditStudyPlan,
        handleDeleteStudyPlan,
        showAlert,
      }}
    >
      {children}
    </StudyPlanContext.Provider>
  );
};
