import {useNavigation} from "@react-navigation/native";
import {BackHandler} from "react-native";
import {Actions, Errors, core, useBridgeCore, useBridgeUi} from "@b1nd/aid-kit/bridge-kit/app";
import * as Location from "expo-location";
import { useNfcRead } from "./screens/NfcRead";

export const useAppBridge = () => {
	const navigation = useNavigation();
	const { webViewProps } = useBridgeCore();
	const { open } = useBridgeUi();
	const { scan: scanNfc, NfcSheet } = useNfcRead();

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

	core.mount(Actions.QR_SCAN, async () => {
		return await open(Actions.QR_SCAN);
	});

	core.mount(Actions.GPS_GET, async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") return Errors.PREMISSION_DENIED as any;

		const location = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.High,
		});

		return {
			coords: {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				altitude: location.coords.altitude,
				accuracy: location.coords.accuracy,
				altitudeAccuracy: location.coords.altitudeAccuracy,
				heading: location.coords.heading,
				speed: location.coords.speed,
			},
			timestamp: location.timestamp,
		};
	});

	core.mountPush(Actions.GPS_GET, (send) => {
		let subscription: Location.LocationSubscription | null = null;

		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") return;

			subscription = await Location.watchPositionAsync(
				{ accuracy: Location.Accuracy.High, distanceInterval: 5 },
				(location) => {
					send({
						coords: {
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
							altitude: location.coords.altitude,
							accuracy: location.coords.accuracy,
							altitudeAccuracy: location.coords.altitudeAccuracy,
							heading: location.coords.heading,
							speed: location.coords.speed,
						},
						timestamp: location.timestamp,
					});
				},
			);
		})();

		return () => {
			subscription?.remove();
		};
	});

	core.mount(Actions.NFC_READ, async () => {
		const result = await scanNfc();
		return result ?? Errors.CANCELLED;
	});

	core.mountPush(Actions.NFC_READ, (send) => {
		return () => {};
	});

	return { webViewProps, NfcSheet };
};
