export interface Viewer {
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasPayment: boolean | null;
  didRequest: boolean;
}
