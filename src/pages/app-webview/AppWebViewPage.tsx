import { View } from "react-native";
import { useTheme } from "@shared/theme";
import { AppWebView } from "@features/app-webview";

export const AppWebViewPage = () => {
	const { colors } = useTheme();

	return (
		<View style={{ flex: 1, backgroundColor: colors.background.default }}>
			<AppWebView />
		</View>
	);
};