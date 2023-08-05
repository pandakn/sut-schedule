// interfaces/email.interface.ts
export interface IEmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
