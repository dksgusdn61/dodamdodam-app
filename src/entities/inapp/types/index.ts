export interface InApp {
  appId: string;
  name: string;
  subtitle: string;
  description: string;
  iconUrl: string;
  darkIconUrl: string | null;
  appUrl: string;
}

export interface InAppPageResponse {
  content: InApp[];
  hasNext: boolean;
}
