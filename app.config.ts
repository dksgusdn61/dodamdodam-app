import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "dodamdodam-app",
  slug: "dodamdodam-app",
  version: "1.0.0",
  ios: {
    ...config.ios,
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
  },
  android: {
    ...config.android,
    usesCleartextTraffic: true,
  },
});
