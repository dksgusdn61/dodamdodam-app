import WidgetKit
import Foundation

struct TimetableEntry: TimelineEntry {
  let date: Date
  let todaySubjects: [String]
  let weekTimetable: [[String]]
  let weekday: Int
  let currentPeriod: Int
}

struct TimetableProvider: TimelineProvider {
  func placeholder(in context: Context) -> TimetableEntry {
    TimetableEntry(
      date: Date(),
      todaySubjects: [],
      weekTimetable: [],
      weekday: 0,
      currentPeriod: 2
    )
  }
  
  func getSnapshot(in context: Context, completion: @escaping (TimetableEntry) -> ()) {
    completion(makeEntry())
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<TimetableEntry>) -> ()) {
    let entry = makeEntry()
    let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
    completion(Timeline(entries: [entry], policy: .after(nextUpdate)))
  }
  
  private func makeEntry() -> TimetableEntry {
    let timetable = loadTimetable()
    let weekday = Calendar.current.component(.weekday, from: Date())
    let index = max(0, min(4, weekday - 2))
    let today = index < timetable.count ? timetable[index] : []
    
    return TimetableEntry(
      date: Date(),
      todaySubjects: today,
      weekTimetable: timetable,
      weekday: index,
      currentPeriod: currentPeriodIndex()
    )
  }
  
  private func currentPeriodIndex() -> Int {
    let now = Date()
    let hour = Calendar.current.component(.hour, from: now)
    let minute = Calendar.current.component(.minute, from: now)
    let current = hour * 60 + minute
    
    let periods = [
      (8*60+50, 9*60+40),
      (9*60+50, 10*60+40),
      (10*60+50, 11*60+40),
      (11*60+50, 12*60+40),
      (13*60+30, 14*60+20),
      (14*60+30, 15*60+20),
      (15*60+30, 16*60+20),
    ]
    
    for (i, period) in periods.enumerated() {
      if current <= period.1 { return i }
    }
    return -1
  }
}
