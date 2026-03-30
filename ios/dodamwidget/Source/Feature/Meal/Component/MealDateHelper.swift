//
//  MealDateHelper.swift
//  dodamdodamapp
//
//  Created by 김은찬 on 3/30/26.
//

import Foundation

struct MealDateHelper {
  public static func targetDateString(from date: Date = Date()) -> String {
    let info = MealType.from(date)
    
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd"
    
    if info.isTomorrow {
      let tomorrow = Calendar.current.date(byAdding: .day, value: 1, to: date) ?? date
      return formatter.string(from: tomorrow)
    }
    
    return formatter.string(from: date)
  }
}
