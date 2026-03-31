//
//  SharedDefaults.swift
//  dodamdodamapp
//
//  Created by 김은찬 on 3/26/26.
//


import Foundation
import WidgetKit

final class SharedDefaults {
  static let shared = SharedDefaults()
  
  private let userDefaults = UserDefaults(suiteName: "group.com.b1nd.dodam.student.shared")!
  
  private init() {}
  
  func setMeals(json: String) {
    print("DEBUG setMeals json:", json)
    userDefaults.set(json, forKey: "widgetMeals")
    WidgetCenter.shared.reloadAllTimelines()
  }
  
  func setTimetable(json: String) {
    print("DEBUG setTimeTable json:", json)
    userDefaults.set(json, forKey: "widgetTimetable")
    WidgetCenter.shared.reloadAllTimelines()
  }
}
