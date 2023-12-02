import { User } from '@prisma/client';

export interface UserResponseData {
  status: number;
  user?: User;
  error?: string;
}
