//
//  Meal.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/26/26.
//

import Foundation

struct MealModel: Codable, Hashable {
  let date: String
  let mealType: String
  let menus: [String]
  let calorie: Double
}

func loadMeals() -> [MealModel] {
  let json = UserDefaults(suiteName: "group.com.dodamdodam.shared")?.string(forKey: "widgetMeals")
  print("DEBUG loadMeals json:", json ?? "nil")
  
  guard let json,
        let data = json.data(using: .utf8)
  else { return [] }
  
  return (try? JSONDecoder().decode([MealModel].self, from: data)) ?? []
}

func loadTodayMeals() -> [MealModel] {
  let formatter = DateFormatter()
  formatter.dateFormat = "yyyy-MM-dd"
  let today = formatter.string(from: Date())
  return loadMeals().filter { $0.date == today }
}
