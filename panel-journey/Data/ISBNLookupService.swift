//
//  ISBNLookupService.swift
//  panel-journey
//
//  Created by Dare on 2026-01-01.
//

import Foundation

struct ComicService {

    func fetchBook(isbn: String) async throws -> Comic {

        guard let url = URL(
            string: "http://localhost:3000/api/books/lookup"
        ) else {
            throw URLError(.badURL)
        }

        var request = URLRequest(url: url)

        request.httpMethod = "POST"

        request.setValue(
            "application/json",
            forHTTPHeaderField: "Content-Type"
        )

        let body = [
            "isbn": isbn
        ]

        request.httpBody = try JSONSerialization.data(
            withJSONObject: body
        )

        let (data, response) = try await URLSession.shared.data(
            for: request
        )

        guard let httpResponse = response as? HTTPURLResponse else {
            throw URLError(.badServerResponse)
        }

        guard (200...299).contains(httpResponse.statusCode) else {

            print(
                "Server error:",
                httpResponse.statusCode
            )

            print(
                String(data: data, encoding: .utf8) ?? ""
            )

            throw URLError(.badServerResponse)
        }

        let decoded = try JSONDecoder().decode(
            Comic.self,
            from: data
        )

        print(decoded)

        return decoded
    }
}
