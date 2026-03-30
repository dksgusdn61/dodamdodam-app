//
//  MealWidgetView.swift
//  dodamwidgetExtension
//
//  Created by 김은찬 on 3/26/26.
//

import SwiftUI
import WidgetKit
import AppIntents

struct MealWidgetView: View {
  var entry: MealEntry
  @Environment(\.widgetFamily) var widgetFamily
  @Environment(\.widgetRenderingMode) var renderingMode
  
  var selectedType: MealType {
    if #available(iOS 17.0, *) {
      let saved = UserDefaults(suiteName: "group.com.dodamdodam.shared")?
        .string(forKey: "selectedMealType") ?? ""
      return MealType(rawValue: saved) ?? MealType.from(Date())
    }
    return MealType.from(Date())
  }
  
  var body: some View {
    Group {
      if #available(iOSApplicationExtension 17.0, *) {
        content
          .containerBackground(renderingMode == .accented ? Color.clear : WidgetColor.backgroundNeutral, for: .widget)
      } else {
        content
      }
    }
  }
  
  @ViewBuilder
  var content: some View {
    if widgetFamily == .systemMedium {
      mediumContent
    } else {
      smallContent
    }
  }
  
  @ViewBuilder
  var mediumContent: some View {
    let currentMeal = entry.meals.first { $0.mealType == selectedType.rawValue }
    
    VStack(spacing: 8) {
      HStack(spacing: 6) {
        if #available(iOS 17.0, *) {
          ForEach(MealType.allCases, id: \.self) { type in
            let meal = entry.meals.first { $0.mealType == type.rawValue }
            let isSelected = selectedType == type
            
            Button(intent: SelectMealIntent(mealType: type.rawValue)) {
              HStack(spacing: 4) {
                Text(type.label)
                  .font(.footnote.bold())
                  .foregroundColor(renderingMode == .accented ? .primary : (isSelected ? .white : WidgetColor.labelAlternative))
                
                Spacer()
                
                if let meal {
                  Text("\(Int(meal.calorie))Kcal")
                    .font(.system(size: 9, weight: .medium))
                    .foregroundColor(renderingMode == .accented ? .primary.opacity(0.7) : (isSelected ? .white.opacity(0.8) : WidgetColor.labelAlternative))
                }
              }
              .padding(.horizontal, 10)
              .padding(.vertical, 6)
              .background(
                Group {
                  if renderingMode == .accented {
                    if isSelected {
                      Capsule().strokeBorder(Color.white.opacity(0.6), lineWidth: 1.5)
                    } else {
                      Color.clear
                    }
                  } else {
                    if isSelected {
                      Capsule().fill(WidgetColor.primaryNormal)
                    } else {
                      Capsule().fill(WidgetColor.backgroundNormal)
                    }
                  }
                }
              )
            }
            .buttonStyle(.plain)
          }
        }
      }
      
      VStack(alignment: .leading, spacing: 2) {
        if let meal = currentMeal, !meal.menus.isEmpty {
          let half = Int(ceil(Double(meal.menus.count) / 2.0))
          HStack(alignment: .top, spacing: 8) {
            VStack(alignment: .leading, spacing: 6) {
              ForEach(meal.menus.prefix(half), id: \.self) { menu in
                MealMenuText(text: menu)
              }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            
            if meal.menus.count > half {
              VStack(alignment: .leading, spacing: 6) {
                ForEach(meal.menus.dropFirst(half), id: \.self) { menu in
                  MealMenuText(text: menu)
                }
              }
              .frame(maxWidth: .infinity, alignment: .leading)
            }
          }
        } else {
          MealMenuText(text: "급식 정보가 없어요", isMealEmpty: true)
        }
        Spacer(minLength: 0)
      }
      .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
      .padding(10)
      .background(renderingMode == .accented ? Color.clear : WidgetColor.backgroundNormal)
      .clipShape(RoundedRectangle(cornerRadius: 14))
      .widgetAccentable()
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .padding(12)
  }
  
  
  @ViewBuilder
  var smallContent: some View {
    let currentType = MealType.from(Date())
    let currentMeal = entry.meals.first { $0.mealType == currentType.rawValue }
    
    VStack(spacing: 8) {
      if let meal = currentMeal {
        HStack {
          Text(currentType.label)
            .foregroundColor(.white)
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(renderingMode == .accented ? Color.clear : WidgetColor.primaryNormal)
            .overlay(
              renderingMode == .accented ? Capsule().strokeBorder(Color.white.opacity(0.6), lineWidth: 1) : nil
            )
            .clipShape(Capsule())
            .font(.footnote.bold())
          
          Spacer()
          
          Text("\(Int(meal.calorie))Kcal")
            .font(.caption)
            .foregroundColor(WidgetColor.labelAlternative)
        }
        
        VStack(alignment: .leading, spacing: 2) {
          if meal.menus.isEmpty {
            MealMenuText(text: "오늘은 급식이 없어요", isMealEmpty: true)
          } else {
            let displayCount = min(meal.menus.count, 6)
            ForEach(0..<displayCount, id: \.self) { idx in
              let menuName = (idx == 5 && meal.menus.count > 6) ? "..." : meal.menus[idx]
              MealMenuText(text: menuName)
            }
          }
          Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(10)
        .background(renderingMode == .accented ? Color.clear : WidgetColor.backgroundNormal)
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .widgetAccentable()
        
      } else {
        Text("급식 정보가 없습니다")
          .font(.footnote)
          .foregroundStyle(WidgetColor.labelAlternative)
          .frame(maxWidth: .infinity, maxHeight: .infinity)
          .widgetAccentable()
      }
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .padding(12)
  }
}
