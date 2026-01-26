//
//  Display.swift
//  panel-journey
//
//  Created by Dare on 2026-01-02.
//
import SwiftUI

struct Display: View {
    let comic: Comic?
    var body: some View {
        VStack {
            Text("Hello, I am the detail view!")
            Text(comic?.title ?? "")
        }
    }
}
