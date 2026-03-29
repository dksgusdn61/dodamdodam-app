//
//  SelectMealIntent.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/26/26.
//

import AppIntents
import WidgetKit

@available(iOS 17.0, *)
struct SelectMealIntent: AppIntent {
  static var title: LocalizedStringResource = "급식 선택"
  
  @Parameter(title: "급식 타입")
  var mealType: String
  
  init() { self.mealType = MealType.from(Date()).rawValue }
  init(mealType: String) { self.mealType = mealType }
  
  func perform() async throws -> some IntentResult {
    UserDefaults(suiteName: "group.com.b1nd.dodam.student.shared")?
      .set(mealType, forKey: "selectedMealType")
    WidgetCenter.shared.reloadAllTimelines()
    return .result()
  }
}
