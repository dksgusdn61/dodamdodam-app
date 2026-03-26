//
//  MealProvider.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/26/26.
//

import WidgetKit
import Foundation

struct SimpleEntry: TimelineEntry {
  let date: Date
  let meals: [MealModel]
}

struct Provider: TimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), meals: [])
  }
  
  func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    completion(SimpleEntry(date: Date(), meals: loadMeals()))
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
    let entry = SimpleEntry(date: Date(), meals: loadMeals())
    let nextUpdate = Date().addingTimeInterval(60 * 30)
    completion(Timeline(entries: [entry], policy: .after(nextUpdate)))
  }
}
