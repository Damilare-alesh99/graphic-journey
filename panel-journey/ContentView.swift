//
//  ContentView.swift
//  panel-journey
//
//  Created by Dare on 2025-12-30.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            TabView {
                AddNew()
                    .tabItem {
                        Image(systemName: "plus")
                        Text("Add New")
                    }
                //978-1-50674-551-0 - test isbn13
                //1607066017 - test isbn10

            }
        }

    }
}

#Preview {
    ContentView()
}
