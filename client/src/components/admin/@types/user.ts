export type Role = "admin" | "user";

export interface Users {
  _id: string;
  name: string;
  username: string;
  role: Role;
  maximumStudyPlans: number;
}

export interface EditUser {
  id: string;
  name?: string;
  role: Role;
  maximumStudyPlans: number;
}
