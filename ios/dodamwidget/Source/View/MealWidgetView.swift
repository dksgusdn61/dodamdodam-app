import SwiftUI
import WidgetKit

struct MealWidgetView: View {
  var entry: SimpleEntry
  
  var body: some View {
    let currentType = MealType.from(Date())
    let currentMeal = entry.meals.first { $0.mealType == currentType.rawValue }
    
    Group {
      if #available(iOSApplicationExtension 17.0, *) {
        content(for: currentMeal, type: currentType)
          .containerBackground(WidgetColor.backgroundNeutral, for: .widget)
      } else {
        content(for: currentMeal, type: currentType)
      }
    }
  }
  
  @ViewBuilder
  private func content(for meal: MealModel?, type: MealType) -> some View {
    VStack(spacing: 8) {
      if let meal = meal {
        HStack {
          Text(type.label)
            .foregroundColor(.white)
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(WidgetColor.primaryNormal)
            .clipShape(Capsule())
            .font(.footnote.bold())
          
          Spacer()
          
          Text("\(Int(meal.kcal))Kcal")
            .font(.caption)
            .foregroundColor(WidgetColor.labelAlternative)
        }
        
        VStack(alignment: .leading, spacing: 2) {
          if meal.menus.isEmpty {
            MealMenuText(text: "오늘은 급식이 없어요", isMealEmpty: true)
          } else {
            ForEach(meal.menus.prefix(7), id: \.self) { menu in
              MealMenuText(text: menu)
            }
          }
          Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(10)
        .background(WidgetColor.backgroundNormal)
        .clipShape(RoundedRectangle(cornerRadius: 14))
        
      } else {
        Text("급식 정보가 없습니다")
          .font(.footnote)
          .foregroundStyle(WidgetColor.labelAlternative)
          .frame(maxWidth: .infinity, maxHeight: .infinity)
      }
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .padding(12)
  }
}
