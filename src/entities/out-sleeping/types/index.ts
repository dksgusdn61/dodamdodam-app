export type OutSleepingStatus = "PENDING" | "ALLOWED" | "DENIED";

export interface OutSleeping {
  publicId: string;
  reason: string;
  status: OutSleepingStatus;
  startAt: string;
  endAt: string;
}

export type OutSleepingResponse = OutSleeping[];

export interface OutSleepingRequest {
  reason: string;
  startAt: string;
  endAt: string;
}