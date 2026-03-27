//
//  TimetableEmptyText.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/27/26.
//

import SwiftUI

struct TimetableEmptyText: View {
  var body: some View {
    Text("시간표가 없어요")
      .font(.footnote)
      .foregroundStyle(WidgetColor.labelAlternative)
      .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
  }
}
