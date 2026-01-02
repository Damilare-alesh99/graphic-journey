//
//  ISBNLookupService.swift
//  panel-journey
//
//  Created by Dare on 2026-01-01.
//
import Foundation


struct ComicService {
    func fetchBook(isbn: String) async throws -> Comic {
        print(isbn)
        let url = URL(string: "https://openlibrary.org/isbn/\(isbn).json")!
        let (data, _) = try await URLSession.shared.data(from: url)
        let decoded = try JSONDecoder().decode(Comic.self, from: data)
        print(decoded)
        return decoded
    }
    
}

