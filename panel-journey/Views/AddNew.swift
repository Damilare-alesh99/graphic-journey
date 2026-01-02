//
//  AddNew.swift
//  panel-journey
//
//  Created by Dare on 2026-01-02.
//
import SwiftUI

struct AddNew: View {
    @State private var comics: [Comic] = [
      //  Comic(title : "Batman"),
        //           Comic(name: "Jenny Court", birthday: Date(timeIntervalSince1970: 0))
    ]
    
    @State private var isbn = ""
    
    let service = ComicService()
    
    
    var body: some View {
        VStack {
            //.safeAreaInset(edge: .bottom) {
            VStack(alignment: .center, spacing: 20) {
                Text("Input ISBN")
                    .font(.headline)
                TextField("ISBN" , text: $isbn)   .textFieldStyle(.roundedBorder)
                Button("Fetch book") {
                    
                }
                .bold()
                Button("Fetch Book") {
                    Task {
                        do {
                            let book = try await service.fetchBook(isbn: isbn)
                            print(book)
                        } catch {
                            print("Request failed:", error)
                        }
                    }
                }
            }  .padding()
        }
        
    }
}

