import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { basicApiHandler } from "@entities/api/common";

function getPlatform(): string {
  if (Platform.OS === "ios") return "IOS";
  if (Platform.OS === "android") return "ANDROID";
  return "WEB";
}

async function requestPermission(): Promise<boolean> {
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}

async function waitForApnsToken(maxRetries = 5): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    const apnsToken = await messaging().getAPNSToken();
    if (apnsToken) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export async function registerPushToken(): Promise<void> {
  try {
    const granted = await requestPermission();
    if (!granted) return;

    if (Platform.OS === "ios") {
      await messaging().registerDeviceForRemoteMessages();
      await waitForApnsToken();
    }

    const fcmToken = await messaging().getToken();
    if (!fcmToken) return;

    await basicApiHandler.post("/notification/device-tokens", {
      fcmToken,
      platform: getPlatform(),
    });
  } catch (err) {
    console.error("Failed to register push token:", err);
  }
}

export async function unregisterPushToken(): Promise<void> {
  try {
    const fcmToken = await messaging().getToken();
    if (!fcmToken) return;

    await basicApiHandler.delete("/notification/device-tokens", {
      data: { fcmToken },
    });
  } catch (err) {
    console.error("Failed to unregister push token:", err);
  }
}
