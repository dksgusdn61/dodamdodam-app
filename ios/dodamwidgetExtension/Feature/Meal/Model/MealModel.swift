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
    let json = UserDefaults(suiteName: "group.com.b1nd.dodam.student.shared")?.string(forKey: "widgetMeals")
    print("DEBUG loadMeals json:", json ?? "nil")
    
    guard let json,
          let data = json.data(using: .utf8)
    else { return [] }
    
    do {
        let result = try JSONDecoder().decode([MealModel].self, from: data)
        print("DEBUG loadMeals result:", result)
        return result
    } catch {
        print("DEBUG loadMeals error:", error)
        return []
    }
}
