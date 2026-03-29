import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useAppBridge } from "./useAppBridge";
import { useAppWebViewUri } from "./useAppWebViewUri";

export const AppWebView = () => {
	const { webViewProps, NfcSheet } = useAppBridge();
	const { uri } = useAppWebViewUri();

	if (!uri) return <View style={{ flex: 1 }} />;

	return (
		<View style={{ flex: 1 }}>
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
			<NfcSheet />
		</View>
	);
};
