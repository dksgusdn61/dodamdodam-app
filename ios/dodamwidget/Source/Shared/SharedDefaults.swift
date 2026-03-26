//
//  SharedDefaults.swift
//  dodamdodamapp
//
//  Created by 김은찬 on 3/26/26.
//


import Foundation
import WidgetKit

final class SharedDefaults {
    static let shared = SharedDefaults()
    
    private let userDefaults = UserDefaults(suiteName: "group.com.dodamdodam.shared")!
    
    private init() {}
    
    func setMeals(json: String) {
        print("DEBUG setMeals json:", json) // ⚡ 앱에서 저장되는 값 확인
        userDefaults.set(json, forKey: "widgetMeals")
        WidgetCenter.shared.reloadAllTimelines()
    }
    
    func getMeals() -> String {
        let value = userDefaults.string(forKey: "widgetMeals") ?? ""
        print("DEBUG getMeals value:", value) // ⚡ 위젯에서 읽어오는 값 확인
        return value
    }
}
