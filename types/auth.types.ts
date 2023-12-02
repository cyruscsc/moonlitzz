export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt?: Date;
}
