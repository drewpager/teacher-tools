export interface Viewer {
  id: string | null;
  token: string | null;
  avatar: string | null;
  paymentId: string | null;
  didRequest: boolean;
}
