export interface UserUpdateInput {
  name: string;
}

export interface SleepCreateInput {
  userId: string;
  start: string; // ISO (2023-12-03T21:00)
  end: string; // ISO (2023-12-03T21:00)
  duration: number; // in sec
  nightmare: boolean;
  wakeup: boolean;
  sweat: boolean;
  notes?: string;
}

export interface SleepUpdateInput {
  start?: string; // ISO (2023-12-03T21:00)
  end?: string; // ISO (2023-12-03T21:00)
  duration?: number; // in sec
  nightmare?: boolean;
  wakeup?: boolean;
  sweat?: boolean;
  note?: string;
}
