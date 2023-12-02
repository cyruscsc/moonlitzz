export interface UserUpdateInput {
  name: string;
}

export interface SleepCreateInput {
  userId: string;
  start: Date;
  end?: Date;
  nightmare: boolean;
  wakeUp: boolean;
  sweat: boolean;
  notes?: string;
}

export interface SleepUpdateInput {
  start?: Date;
  end?: Date;
  nightmare?: boolean;
  wakeUp?: boolean;
  sweat?: boolean;
  notes?: string;
}
