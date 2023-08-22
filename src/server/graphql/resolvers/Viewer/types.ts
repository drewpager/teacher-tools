import { Playlist } from "../../../lib/types";

export interface LogInArgs {
  input: { code?: string; email?: string; password?: string } | null;
}

export interface ConnectStripeArgs {
  input: { code: string };
}

export interface PlaylistArgs {
  limit: number;
  page: number;
}

export interface PlaylistArgsData {
  total: number;
  result: Playlist[];
}

export interface PaymentArgs {
  id: string;
}

export interface LogInEmailArgs {
  email: string | null;
  password: string | null;
}
