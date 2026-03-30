//
//  TimetableHeaderLabel.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/27/26.
//

import SwiftUI
import WidgetKit

struct TimetableHeaderLabel: View {
  let label: String
  @Environment(\.widgetRenderingMode) var renderingMode
  
  var body: some View {
    Text(label)
      .foregroundColor(renderingMode == .accented ? .primary : .white)
      .padding(.horizontal, 10)
      .padding(.vertical, 4)
      .background(
        Group {
          if renderingMode == .accented {
            Capsule().strokeBorder(Color.white.opacity(0.6), lineWidth: 1)
          } else {
            Capsule().fill(WidgetColor.primaryNormal)
          }
        }
      )
      .font(.footnote.bold())
  }
}
