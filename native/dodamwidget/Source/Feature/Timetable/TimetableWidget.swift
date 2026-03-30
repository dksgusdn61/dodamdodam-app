//
//  TimetableWidget.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/27/26.
//

import SwiftUI
import WidgetKit

struct TimetableWidget: Widget {
  let kind: String = "TimetableWidget"
  
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: TimetableProvider()) { entry in
      TimetableWidgetView(entry: entry)
    }
    .configurationDisplayName("도담도담 시간표 위젯")
    .description("오늘 또는 주간 시간표를 확인해요")
    .contentMarginsDisabled()
    .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
  }
}
