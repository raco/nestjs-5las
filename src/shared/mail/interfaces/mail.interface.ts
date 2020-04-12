export interface Mailable {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
