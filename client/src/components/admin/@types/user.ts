export interface Users {
  _id: string;
  name: string;
  username: string;
  role: string;
}

export interface EditUser {
  id: string;
  name?: string;
}
