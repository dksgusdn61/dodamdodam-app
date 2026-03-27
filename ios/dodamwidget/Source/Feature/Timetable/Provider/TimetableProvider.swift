import WidgetKit
import Foundation

struct TimetableEntry: TimelineEntry {
  let date: Date
  let todaySubjects: [String]
  let weekTimetable: [[String]]
  let weekday: Int
}

struct TimetableProvider: TimelineProvider {
  func placeholder(in context: Context) -> TimetableEntry {
    TimetableEntry(
      date: Date(),
      todaySubjects: ["프밍", "프실", "창업", "운동", "네트", "수학", "잔로"],
      weekTimetable: [],
      weekday: 0
    )
  }
  
  func getSnapshot(in context: Context, completion: @escaping (TimetableEntry) -> ()) {
    completion(makeEntry())
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<TimetableEntry>) -> ()) {
    let entry = makeEntry()
    let nextUpdate = Date().addingTimeInterval(60 * 30)
    completion(Timeline(entries: [entry], policy: .after(nextUpdate)))
  }
  
  private func makeEntry() -> TimetableEntry {
    let timetable = loadTimetable()
    let weekday = Calendar.current.component(.weekday, from: Date())
    let index = max(0, weekday - 2)
    let today = index < timetable.count ? timetable[index] : []
    
    return TimetableEntry(
      date: Date(),
      todaySubjects: today,
      weekTimetable: timetable,
      weekday: index
    )
  }
}
