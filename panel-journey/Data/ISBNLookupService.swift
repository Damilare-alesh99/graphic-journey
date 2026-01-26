//
//  ISBNLookupService.swift
//  panel-journey
//
//  Created by Dare on 2026-01-01.
//
import Foundation

struct ComicService {
    func fetchBook(isbn: String) async throws -> Comic? {
        // print(isbn)
        var decoded: Comic?
        do {
            let url = URL(string: "https://openlibrary.org/isbn/\(isbn).json")!
            let (data, _) = try await URLSession.shared.data(from: url)
            decoded = try JSONDecoder().decode(Comic.self, from: data)
            print(decoded)
        } catch {
            print("Error", error)
        }

        return decoded
    }

    func fetchBookCovers(isbn: String) async throws -> Comic {
        // print(isbn)
        let url = URL(string: "https://openlibrary.org/b/isbn/\(isbn).jpeg")!
        let (data, _) = try await URLSession.shared.data(from: url)
        print(data)
        let decoded = try JSONDecoder().decode(Comic.self, from: data)
        print(decoded)
        return decoded
    }

}
