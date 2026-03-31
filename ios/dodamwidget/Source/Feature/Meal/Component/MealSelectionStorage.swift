//
//  MealSelectionStorage.swift
//  dodamdodamapp
//
//  Created by 김은찬 on 3/30/26.
//


import Foundation

struct MealSelectionStorage {
  
  private static let suite = UserDefaults(suiteName: "group.com.b1nd.dodam.student.shared")
  private static let typeKey = "selectedMealType"
  private static let timeKey = "selectedMealTime"
  
  public static let validSeconds: TimeInterval = 60 * 60 * 3
  
  public static func loadSelectedMealType(defaultType: MealType) -> MealType {
    guard
      let savedType = suite?.string(forKey: typeKey),
      let savedDate = suite?.object(forKey: timeKey) as? Date,
      let mealType = MealType(rawValue: savedType)
    else {
      return defaultType
    }
    
    let elapsed = Date().timeIntervalSince(savedDate)
    
    if elapsed > validSeconds {
      suite?.removeObject(forKey: typeKey)
      suite?.removeObject(forKey: timeKey)
      return defaultType
    }
    
    return mealType
  }
}
