import { View } from "react-native";
import { Skeleton } from "@shared/ui";
import React from "react";
import { styles } from "./styles";

export const ProfileCardSkeleton = () => (
	<View style={styles.container}>
		<Skeleton width={64} height={64} radius={50} />
		<View style={styles.textContainer}>
			<Skeleton width={160} height={20} radius={4} />
			<Skeleton width={100} height={14} radius={4} />
		</View>
	</View>
);