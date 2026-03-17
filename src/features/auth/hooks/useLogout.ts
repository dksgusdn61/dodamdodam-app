import { useCallback } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { tokenStorage } from "@entities/api/common";

export const useLogout = () => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    await tokenStorage.clear();
    queryClient.clear();
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Login" }] }),
    );
  }, [navigation, queryClient]);
};
