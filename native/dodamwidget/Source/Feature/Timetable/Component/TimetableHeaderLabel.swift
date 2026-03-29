//
//  TimetableHeaderLabel.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/27/26.
//

import SwiftUI

struct TimetableHeaderLabel: View {
  let label: String
  
  var body: some View {
    Text(label)
      .foregroundColor(.white)
      .padding(.horizontal, 10)
      .padding(.vertical, 4)
      .background(WidgetColor.primaryNormal)
      .clipShape(Capsule())
      .font(.footnote.bold())
  }
}
