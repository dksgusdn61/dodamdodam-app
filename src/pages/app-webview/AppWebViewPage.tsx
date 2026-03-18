import { useRoute, type RouteProp } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBridgeCore } from "@b1nd/aid-kit/bridge-kit/app";

interface AppWebViewParams {
  appUrl: string;
  name: string;
}

type AppWebViewRouteProp = RouteProp<{ AppWebView: AppWebViewParams }, "AppWebView">;

export const AppWebViewPage = () => {
	const { params } = useRoute<AppWebViewRouteProp>();
	const { top, bottom } = useSafeAreaInsets();
	const { webViewProps } = useBridgeCore();

	const separator = params.appUrl.includes("?") ? "&" : "?";
	const uri = `${params.appUrl}${separator}top=${top}&bottom=${bottom}`;

	return (
		<WebView
			{...webViewProps}
			source={{ uri }}
			overScrollMode="never"
			bounces={false}
			setBuiltInZoomControls={false}
			setDisplayZoomControls={false}
			showsHorizontalScrollIndicator={false}
			scalesPageToFit={true}
		/>
	);
};