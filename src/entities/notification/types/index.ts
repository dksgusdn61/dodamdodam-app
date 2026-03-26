export interface Notification {
  id: string;
  appPublicId: string;
  userPublicId: string;
  title: string;
  body: string;
  status: string;
  isRead: boolean;
  errorMessage: string | null;
  createdAt: string;
}

export interface NotificationResponse {
  content: Notification[];
  hasNext: boolean;
}
