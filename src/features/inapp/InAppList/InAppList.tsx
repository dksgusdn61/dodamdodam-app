import React from "react";
import { View, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@shared/ui";
import { MenuItem } from "@pages/more/ui/MenuItem";
import { useInAppsSuspense } from "../useInApps";
import { InAppListSkeleton } from "./InAppListSkeleton";
import { styles } from "./styles";

interface InAppListProps {
  onEndReachedRef?: React.RefObject<(() => void) | null>;
}

export const InAppListComponent = ({ onEndReachedRef }: InAppListProps) => {
  const { apps, loadingMore, fetchMore } = useInAppsSuspense();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<any>();
  const isDark = colorScheme === "dark";

  if (onEndReachedRef) {
    onEndReachedRef.current = fetchMore;
  }

  if (apps.length === 0) return null;

  return (
    <>
      <Divider />
      <View style={styles.section}>
        {apps.map((app) => (
          <MenuItem
            key={app.appId}
            iconImage={{ uri: isDark && app.darkIconUrl ? app.darkIconUrl : app.iconUrl }}
            title={app.subtitle}
            appName={app.name}
            onPress={() =>
              navigation.navigate("AppIn", {
                appId: app.appId,
                name: app.name,
                team: "B1ND",
                subTitle: app.subtitle,
                description: app.description,
                iconUrl: app.iconUrl,
                darkIconUrl: app.darkIconUrl,
                appUrl: app.appUrl,
              })
            }
          />
        ))}
        {loadingMore && <InAppListSkeleton />}
      </View>
    </>
  );
};
