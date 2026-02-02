import Foundation

//  Comic.swift
//  panel-journey
//
//  Created by Dare on 2025-12-30.
//

struct Comic: Decodable, Hashable {
    let id: String?
    let title: String?
    let subtitle: String?
    let numberOfPages: Int?
    let publishDate: String?
    let publishers: [String]?
    let isbn13: [String]?
    let covers: [Int]?
    let subjects: [String]?
    let lcClassifications: [String]?
    let weight: String?

    //    let languages: [KeyRef]?
    //    let authors: [KeyRef]?
    //    let works: [KeyRef]?
    //    let created: DateValue?
    //    let lastModified: DateValue?

    enum CodingKeys: String, CodingKey {
        case id
        case title
        case subtitle
        case numberOfPages = "number_of_pages"
        case publishDate = "publish_date"
        case publishers
        case isbn13 = "isbn_13"
        case subjects
        case covers
        case lcClassifications = "lc_classifications"
        case weight
        //    case created
        //    case lastModified = "last_modified"
        //  case key
        //    case languages
        //    case authors
        //    case works
    }
}
