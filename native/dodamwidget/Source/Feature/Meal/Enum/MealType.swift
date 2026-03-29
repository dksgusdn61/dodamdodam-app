//
//  MealType.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/26/26.
//

import Foundation

public enum MealType: String, CaseIterable {
  case breakfast = "BREAKFAST"
  case lunch = "LUNCH"
  case dinner = "DINNER"
  
  public var label: String {
    switch self {
    case .breakfast: return "아침"
    case .lunch: return "점심"
    case .dinner: return "저녁"
    }
  }
  
  public static func from(_ date: Date) -> Self {
    let hour = date[.hour]
    let minute = date[.minute]
    let currentTime = hour * 100 + minute
    
    if currentTime <= 820 {
      return .breakfast
    } else if currentTime <= 1330 {
      return .lunch
    } else if currentTime <= 1910 {
      return .dinner
    } else {
      return .breakfast
    }
  }
}

// MARK: - Date Extension
extension Date {
  subscript(components: Calendar.Component) -> Int {
    var calendar = Calendar.current
    calendar.locale = Locale(identifier: "ko_KR")
    return calendar.component(components, from: self)
  }
}
