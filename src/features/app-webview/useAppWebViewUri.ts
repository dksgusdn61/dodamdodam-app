import { useRoute, type RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppWebViewParams {
  appUrl: string;
  name: string;
}

type AppWebViewRouteProp = RouteProp<{ AppWebView: AppWebViewParams }, "AppWebView">;

export const useAppWebViewUri = () => {
	const { params } = useRoute<AppWebViewRouteProp>();
	const { top, bottom } = useSafeAreaInsets();

	const separator = params.appUrl.includes("?") ? "&" : "?";
	const uri = `${params.appUrl}${separator}top=${top}&bottom=${bottom}`;

	return { uri };
};
