import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "dodamdodam-app",
  slug: "dodamdodam-app",
  version: "1.0.0",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/messaging",
    "./plugins/withModularHeaders",
  ],
  ios: {
    ...config.ios,
    bundleIdentifier: "com.dodamdodamapp",
    googleServicesFile: "./GoogleService-Info.plist",
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
  },
  android: {
    ...config.android,
    package: "com.dodamdodamapp",
    usesCleartextTraffic: true,
    googleServicesFile: "./google-services.json",
  },
});