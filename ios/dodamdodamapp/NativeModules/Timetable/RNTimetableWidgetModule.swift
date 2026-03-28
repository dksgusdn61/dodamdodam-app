import Foundation

@objc(RNTimetableWidgetModule)
class RNTimetableWidgetModule: NSObject {
  
  @objc(saveTimetable:)
  func saveTimetable(json: String) {
    SharedDefaults.shared.setTimetable(json: json)
  }
}
