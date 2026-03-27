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
  
  private let userDefaults = UserDefaults(suiteName: "group.com.dodamdodam.shared")!
  
  private init() {}
  
  func setMeals(json: String) {
    userDefaults.set(json, forKey: "widgetMeals")
    WidgetCenter.shared.reloadAllTimelines()
  }
  
  func setTimetable(json: String) {
    userDefaults.set(json, forKey: "widgetTimetable")
    WidgetCenter.shared.reloadAllTimelines()
  }
}
