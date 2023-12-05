import { Sleep, User } from '@prisma/client';

export interface BasicResponseData {
  status: number;
  message?: string;
  error?: string;
}

export interface UserResponseData extends BasicResponseData {
  user?: User;
}

export interface SleepResponseData extends BasicResponseData {
  sleep?: Sleep;
}

export interface SleepsResponseData extends BasicResponseData {
  sleeps?: Sleep[];
}
