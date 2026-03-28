//
//  TimetableModel.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/27/26.
//

import Foundation

func loadTimetable() -> [[String]] {
  guard let json = UserDefaults(suiteName: "group.com.dodamdodam.shared")?
    .string(forKey: "widgetTimetable"),
        let data = json.data(using: .utf8)
  else { return [] }
  
  return (try? JSONDecoder().decode([[String]].self, from: data)) ?? []
}
