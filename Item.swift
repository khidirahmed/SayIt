//
//  Item.swift
//  SayIt
//
//  Created by Khidir Ahmed on 10/26/24.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
