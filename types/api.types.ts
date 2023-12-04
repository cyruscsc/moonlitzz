import { Sleep, User } from '@prisma/client';

export interface UserResponseData {
  status: number;
  user?: User;
  error?: string;
}

export interface SleepResponseData {
  status: number;
  sleep?: Sleep;
  sleeps?: Sleep[];
  error?: string;
}
