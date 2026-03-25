import { WebView } from "react-native-webview";
import { useAppBridge } from "./useAppBridge";
import { useAppWebViewUri } from "./useAppWebViewUri";

export const AppWebView = () => {
	const { webViewProps } = useAppBridge();
	const { uri } = useAppWebViewUri();

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
			style={{ backgroundColor: "transparent" }}
		/>
	);
};
