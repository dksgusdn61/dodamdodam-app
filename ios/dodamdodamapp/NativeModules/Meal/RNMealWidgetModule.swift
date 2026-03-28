import Foundation

@objc(RNMealWidgetModule)
class RNMealWidgetModule: NSObject {
  
  @objc(saveMeals:)
  func saveMeals(json: String) {
    SharedDefaults.shared.setMeals(json: json)
  }
}
