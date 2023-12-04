export interface UserUpdateInput {
  name: string;
}

export interface SleepCreateInput {
  userId: string;
  start: string; // date.toISOString().slice(0, 16) (2023-12-03T21:00)
  end: string; // date.toISOString().slice(0, 16) (2023-12-03T21:00)
  nightmare: boolean;
  wakeUp: boolean;
  sweat: boolean;
  notes?: string;
}

export interface SleepUpdateInput {
  start?: string; // date.toISOString().slice(0, 16) (2023-12-03T21:00)
  end?: string; // date.toISOString().slice(0, 16) (2023-12-03T21:00)
  nightmare?: boolean;
  wakeUp?: boolean;
  sweat?: boolean;
  note?: string;
}
