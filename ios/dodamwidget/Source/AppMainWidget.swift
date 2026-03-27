//
//  MealWidget.swift
//  MealWidget
//
//  Created by 김은찬 on 3/26/26.
//

import SwiftUI
import WidgetKit

@main
struct MealWidget: Widget {
  let kind: String = "MealWidget"
  
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: Provider()) { entry in
      MealWidgetView(entry: entry)
    }
    .configurationDisplayName("도담도담 위젯")
    .description("오늘의 급식 정보를 확인해보세요!")
    .supportedFamilies([.systemSmall, .systemMedium])
    .contentMarginsDisabled()
  }
}
