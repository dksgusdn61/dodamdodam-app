export type OutSleepingStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface OutSleeping {
  publicId: string;
  reason: string;
  status: OutSleepingStatus;
  startAt: string;
  endAt: string;
}

export interface OutSleepingResponse {
  outSleeping: OutSleeping[];
}

export interface OutSleepingRequest {
  reason: string;
  startAt: string;
  endAt: string;
}