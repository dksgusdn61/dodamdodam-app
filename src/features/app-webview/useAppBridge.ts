import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { Actions, core, useBridgeCore } from "@b1nd/aid-kit/bridge-kit/app";

export const useAppBridge = () => {
	const navigation = useNavigation();
	const { webViewProps } = useBridgeCore();

	core.mount(Actions.NAVIGATION_POP, async () => {
		navigation.goBack();
		return null;
	});

	core.mountPush(Actions.NAVIGATION_POP, (send) => {
		const handler = BackHandler.addEventListener("hardwareBackPress", () => {
			send({});
			return true;
		});
		return () => handler.remove();
	});

	return { webViewProps };
};
