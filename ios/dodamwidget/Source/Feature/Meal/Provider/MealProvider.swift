//
//  MealProvider.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/26/26.
//

import WidgetKit
import Foundation

struct MealEntry: TimelineEntry {
  let date: Date
  let meals: [MealModel]
}

struct MealProvider: TimelineProvider {
  func placeholder(in context: Context) -> MealEntry {
    MealEntry(date: Date(), meals: loadMeals())
  }
  
  func getSnapshot(in context: Context, completion: @escaping (MealEntry) -> ()) {
    completion(MealEntry(date: Date(), meals: loadMeals()))
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<MealEntry>) -> ()) {
    let entry = MealEntry(date: Date(), meals: loadMeals())
    let nextUpdate = Date().addingTimeInterval(60 * 30)
    completion(Timeline(entries: [entry], policy: .after(nextUpdate)))
  }
}
