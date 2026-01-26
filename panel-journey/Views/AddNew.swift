//
//  AddNew.swift
//  panel-journey
//
//  Created by Dare on 2026-01-02.
//
import SwiftUI

struct AddNew: View {
    @State private var fetchedComic: Comic?
    @State private var comics: [Comic] = []
    @State private var showInvalidISBNAlert = false

    //for isbn picker
    enum IsbnType: String, CaseIterable, Identifiable {
        case isbn10 = "10"
        case isbn13 = "13"
        var id: Self { self }
    }

    enum MyError: Error {
        case error(String)
    }

    @State private var selectedType: IsbnType = .isbn13
    //isbn itself
    @State private var isbn = ""

    //fetch comic/book import
    let service = ComicService()

    func normalizeISBN(isbn: String) -> String {
        isbn
            .uppercased()
            .replacingOccurrences(of: "-", with: "")
            .replacingOccurrences(of: " ", with: "")
    }

    func isValidISBNTen(isbn: String) throws -> Bool {

        let digits = isbn.compactMap { $0.wholeNumberValue }
        guard digits.count == 10 else {
            showInvalidISBNAlert = true
            throw MyError.error("Invalid ISBN Number")
        }

        let chars = Array(isbn)

        var sum = 0

        do {
            for i in 0..<9 {
                guard let digit = chars[i].wholeNumberValue else {
                    showInvalidISBNAlert = true
                    throw MyError.error("Invalid ISBN Number")
                }
                sum += digit * (10 - i)
            }

            var lastValue = 0
            if chars[9] == "X" {
                lastValue = 10
            } else if let digit = chars[9].wholeNumberValue {
                lastValue = digit
            } else {
                showInvalidISBNAlert = true
                throw MyError.error("Invalid ISBN Number")
            }

            sum += lastValue
            return sum % 11 == 0
        } catch {
            showInvalidISBNAlert = true
            throw MyError.error("Invalid ISBN Number")
        }

    }

    func isValidISBNThirteen(isbn: String) throws -> Bool {

        let digits = isbn.compactMap { $0.wholeNumberValue }
        guard digits.count == 13 else {
            showInvalidISBNAlert = true
            throw MyError.error("Invalid ISBN Number")
        }

        let sum = digits.enumerated().reduce(0) { result, pair in
            let (index, digit) = pair
            return result + digit * (index % 2 == 0 ? 1 : 3)
        }

        return sum % 10 == 0
    }

    var body: some View {
        VStack {
            //.safeAreaInset(edge: .bottom) {

            VStack(alignment: .center, spacing: 20) {
                Text("Input ISBN")
                    .font(.headline)
                HStack {

                    TextField("ISBN", text: $isbn).textFieldStyle(
                        .roundedBorder
                    )
                    .bold()

                    Picker("Type", selection: $selectedType) {
                        Text("10").tag(IsbnType.isbn10)
                        Text("13").tag(IsbnType.isbn13)
                    }

                }

                Button("Fetch Book") {
                    Task {
                        do {

                            if selectedType == IsbnType.isbn13 {

                                try isValidISBNThirteen(isbn: isbn)

                            } else if selectedType == IsbnType.isbn10 {
                                try isValidISBNTen(isbn: isbn)
                            }

                            let book = try await service.fetchBook(
                                isbn: isbn)
                            print(book)
                            fetchedComic = book

                        } catch MyError.error(let errorMessage) {
                            print("Request failed:", errorMessage)
                        }
                    }
                }.alert(

                    "Important Message", isPresented: $showInvalidISBNAlert
                ) {

                } message: {
                    Text("Invalid ISBN number.")
                }

                //                .navigationDestination(item: $fetchedComic) { fetchedComic in
                //                    Display(comic: fetchedComic)
                //                }
            }
        }.padding()

        NavigationStack {
            NavigationLink(
                "Go to Detail", destination: Display(comic: fetchedComic)
            )
            .navigationTitle("Display")
        }

    }

}
