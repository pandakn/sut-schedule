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
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

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
  handleAddStudyPlan: (name: string) => Promise<void>;
  handleEditStudyPlan: (id: string, name: string) => Promise<void>;
  handleDeleteStudyPlan: (id: string) => Promise<void>;
  selectedPlan: ISelectedPlan;
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
      const res = await addStudyPlan(payload.id, name, accessToken);

      if (res?.status) {
        toast.success("Study Plan added successfully", {
          duration: 1500,
        });
        setStudyPlanOfUser((prev) => {
          return [...prev, res.data.result];
        });
      } else {
        toast.error(res?.data.message, {
          duration: 1500,
        });
        return;
      }
    }
  };

  const handleEditStudyPlan = async (studyPlanID: string, name: string) => {
    toast.success("Study Plan updated successfully", { duration: 1000 });

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
  };

  const handleDeleteStudyPlan = async (studyPlanID: string) => {
    const duration = 1500;
    toast.success("Study Plan deleted successfully", {
      duration,
      icon: (
        <AiOutlineDelete className="text-[#991b1b] text-2xl bg-[#fef2f2]" />
      ),
    });
    accessToken &&
      (await deleteStudyPlan(payload.id, studyPlanID, accessToken));

    setTimeout(() => window.location.reload(), duration);
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
      }}
    >
      {children}
    </StudyPlanContext.Provider>
  );
};
