//
//  TimetablePeriodRow.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/27/26.
//

import SwiftUI

struct TimetablePeriodRow: View {
  let period: Int
  let subject: String
  var fontSize: CGFloat = 10
  var periodWidth: CGFloat = 30
  
  var body: some View {
    HStack(spacing: 4) {
      Text("\(period)교시")
        .font(.system(size: fontSize - 1, weight: .bold))
        .foregroundStyle(WidgetColor.labelAlternative)
        .frame(width: periodWidth)
      Text(subject)
        .font(.system(size: fontSize))
        .foregroundStyle(WidgetColor.labelNormal)
        .lineLimit(1)
      Spacer()
    }
  }
}
