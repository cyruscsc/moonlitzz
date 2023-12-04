import {
  SleepCreateInput,
  SleepUpdateInput,
  UserUpdateInput,
} from '@/types/data.types';
import prisma from './prisma';

export const getUserById = (id: string) =>
  prisma.user.findUnique({ where: { id } });

export const getUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const updateUser = (id: string, data: UserUpdateInput) =>
  prisma.user.update({ where: { id }, data });

export const deleteUser = (id: string) => prisma.user.delete({ where: { id } });

export const getSleeps = (userId: string) =>
  prisma.sleep.findMany({ where: { userId } });

export const getSleep = (id: string) =>
  prisma.sleep.findUnique({ where: { id } });

export const createSleep = (data: SleepCreateInput) =>
  prisma.sleep.create({ data });

export const updateSleep = (id: string, data: SleepUpdateInput) =>
  prisma.sleep.update({ where: { id }, data });

export const deleteSleep = (id: string) =>
  prisma.sleep.delete({ where: { id } });
