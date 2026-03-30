import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "dodamdodam-app",
  slug: "dodamdodam-app",
  version: "5.0.0",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/messaging",
    "./plugins/withModularHeaders",
    "./plugins/withNativeModules",
    "./plugins/withWidgetExtension",
    [
      "react-native-nfc-manager",
      { nfcPermission: "NFC 태그를 읽기 위해 권한이 필요해요." },
    ],
  ],
  ios: {
    ...config.ios,
    bundleIdentifier: "com.b1nd.dodamdodamapp",
    googleServicesFile: "./GoogleService-Info.plist",
    entitlements: {
      "com.apple.developer.nfc.readersession.formats": ["NDEF"],
    },
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
      NFCReaderUsageDescription: "NFC 태그를 읽기 위해 권한이 필요해요.",
    },
  },
  android: {
    ...config.android,
    package: "com.b1nd.dodam.student",
    googleServicesFile: "./google-services.json",
    permissions: [
      "android.permission.POST_NOTIFICATIONS",
      "android.permission.NFC",
    ],
  },
});