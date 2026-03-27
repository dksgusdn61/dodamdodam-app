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
  var periodWidth: CGFloat = 26
  var isHighlighted: Bool = false
  
  var body: some View {
    HStack(spacing: 6) {
      Text("\(period)교시")
        .font(.system(size: fontSize - 1, weight: isHighlighted ? .bold : .medium))
        .foregroundStyle(isHighlighted ? WidgetColor.primaryNormal : WidgetColor.labelAlternative)
        .frame(width: periodWidth, alignment: .leading)
      
      Text(subject)
        .font(.system(size: fontSize, weight: isHighlighted ? .bold : .regular))
        .foregroundStyle(isHighlighted ? WidgetColor.primaryNormal : WidgetColor.labelNormal)
        .lineLimit(1)
      Spacer()
    }
  }
}
