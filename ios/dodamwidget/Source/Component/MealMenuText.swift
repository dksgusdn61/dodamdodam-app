//
//  MealMenuText.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/26/26.
//

import SwiftUI

struct MealMenuText: View {
  let text: String
  let isMealEmpty: Bool
  
  init(text: String, isMealEmpty: Bool = false) {
    self.text = text
    self.isMealEmpty = isMealEmpty
  }
  
  var body: some View {
    VStack {
      if isMealEmpty {
        Text(text)
          .font(.footnote)
          .multilineTextAlignment(.center)
          .foregroundStyle(WidgetColor.labelNormal)
          .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
      } else {
        Text(text)
          .lineLimit(1)
          .truncationMode(.tail)
          .font(.caption)
          .foregroundStyle(WidgetColor.labelNormal)
          .frame(maxWidth: .infinity, alignment: .leading)
      }
    }
  }
}
