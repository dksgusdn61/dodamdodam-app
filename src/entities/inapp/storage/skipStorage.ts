import * as SecureStore from "expo-secure-store";

const SKIP_KEY = "inapp_skip_ids";

export const skipStorage = {
  getSkippedIds: async (): Promise<string[]> => {
    const raw = await SecureStore.getItemAsync(SKIP_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  addSkippedId: async (appId: string) => {
    const ids = await skipStorage.getSkippedIds();
    if (!ids.includes(appId)) {
      await SecureStore.setItemAsync(SKIP_KEY, JSON.stringify([...ids, appId]));
    }
  },

  isSkipped: async (appId: string): Promise<boolean> => {
    const ids = await skipStorage.getSkippedIds();
    return ids.includes(appId);
  },
};
