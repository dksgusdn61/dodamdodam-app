import { NativeModules } from "react-native";

const { RNMealWidgetModule } = NativeModules;

export const saveMealsToWidget = (meals: any) => {
  RNMealWidgetModule.saveMeals(JSON.stringify(meals));
};