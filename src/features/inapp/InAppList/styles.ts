import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    paddingVertical: 4,
  },
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  skeletonText: {
    flex: 1,
    gap: 6,
  },
  loadingMore: {
    paddingVertical: 12,
    alignItems: "center",
  },
});
