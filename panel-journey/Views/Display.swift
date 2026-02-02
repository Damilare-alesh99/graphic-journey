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
        VStack(spacing: 20) {
            Text("Book Details").font(.title)
            AsyncImage(url : URL(string: "https://covers.openlibrary.org/b/id/\(comic?.covers?[0] ?? 0)-L.jpg"))
            Text("Title : \(comic?.title ?? "")")
            Text("Number of Pages : \(comic?.numberOfPages ?? 0)")
            Text("Isbn 13 : \(comic?.isbn13?[0] ?? "")")
        
            HStack() {
                Text("Subjects : ") ;ForEach(comic?.subjects ?? [], id: \.self) { subject in
                Text(subject)
            }
            }
            Text("Publish Date : \(comic?.publishDate ?? "")")
            HStack() {
                Text("Publishers : ") ;ForEach(comic?.publishers ?? [], id: \.self) { publisher in
                Text(publisher)
            }
            }
        }
           
        }
        //978-1-50674-551-0 - test isbn13
        //1607066017 - test isbn10
    }

