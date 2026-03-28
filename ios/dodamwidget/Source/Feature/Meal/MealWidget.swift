//
//  MealWidget.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/27/26.
//

import SwiftUI
import WidgetKit

struct MealWidget: Widget {
  let kind: String = "MealWidget"
  
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: MealProvider()) { entry in
      MealWidgetView(entry: entry)
    }
    .configurationDisplayName("도담도담 급식 위젯")
    .description("오늘의 급식 정보를 확인해보세요!")
    .supportedFamilies([.systemSmall, .systemMedium])
    .contentMarginsDisabled()
  }
}
