export interface IComment {
  _id: string;
  author: { _id: string; username: string; name: string };
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
