export interface IRegisterForm {
  name: string;
  username: string;
  password: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

interface IAccessPayload {
  id: string;
  name: string;
  username: string;
}

export interface ILoginResponse {
  message: string;
  result?: {
    accessToken: string;
    accessPayload: IAccessPayload;
  };
}
