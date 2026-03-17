import {StyleSheet} from "react-native";
import {typo} from "@shared/tokens";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 20,
		gap: 16,
		borderRadius: 16,
		borderCurve: "continuous" as const,
		overflow: "hidden" as const,
	},
	profileImage: {
		width: 64,
		height: 64,
		borderRadius: 9999,
	},
	textContainer: {
		flex: 1,
		gap: 4,
	},
	greeting: {
		...typo("Headline", "Bold"),
	},
	roleLabelRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	roleLabel: {
		...typo("Label", "Medium"),
	},
});
