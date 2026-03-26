//
//  Meal.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/26/26.
//

import Foundation

struct MealModel: Codable, Hashable {
  let mealType: String
  let menus: [String]
  let kcal: Double
}

func loadMeals() -> [MealModel] {
  guard let json = UserDefaults(suiteName: "group.com.dodamdodam.shared")?.string(forKey: "widgetMeals"),
        let data = json.data(using: .utf8)
  else { return [] }
  
  return (try? JSONDecoder().decode([MealModel].self, from: data)) ?? []
}
