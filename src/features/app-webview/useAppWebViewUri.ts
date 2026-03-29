import { useState, useEffect } from "react";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tokenStorage } from "@entities/api/common/tokenStorage";

interface AppWebViewParams {
  appUrl: string;
  name: string;
}

type AppWebViewRouteProp = RouteProp<{ AppWebView: AppWebViewParams }, "AppWebView">;

export const useAppWebViewUri = () => {
  const { params } = useRoute<AppWebViewRouteProp>();
  const { top, bottom } = useSafeAreaInsets();
  const [uri, setUri] = useState("");

  useEffect(() => {
    (async () => {
      const token = await tokenStorage.getAccessToken();
      const separator = params.appUrl.includes("?") ? "&" : "?";
      setUri(`${params.appUrl}${separator}top=${top}&bottom=${bottom}&token=${token ?? ""}`);
    })();
  }, [params.appUrl, top, bottom]);

  return { uri };
};
