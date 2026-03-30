//
//  TimetableEmptyText.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/27/26.
//

import SwiftUI
import WidgetKit

struct TimetableEmptyText: View {
  var text: String = "시간표가 없어요"
  @Environment(\.widgetRenderingMode) var renderingMode
  
  var body: some View {
    Text(text)
      .font(.footnote)
      .multilineTextAlignment(.center)
      .lineSpacing(4)
      .foregroundStyle(renderingMode == .accented ? .secondary : WidgetColor.labelNormal)
      .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
  }
}
