import Foundation

//struct ComicResponse : Decodable {
//    let results : [Comic]
//}

struct Comic : Decodable {
    let numberOfPages: Int?
      let weight: String?
      let covers: [Int]?
      let lcClassifications: [String]?
      let latestRevision: Int?
      let sourceRecords: [String]?
      let title: String?


      let subjects: [String]?
      let publishCountry: String?
      let byStatement: String?
      let oclcNumbers: [String]?

      let physicalDimensions: String?
      let revision: Int?
      let publishers: [String]?

      let physicalFormat: String?

      let key: String?
      let authors: [Author]?
      let publishPlaces: [String]?
      let pagination: String?
      let classifications: [String: String]?
 
      let lccn: [String]?
      let notes: String?

      let isbn13: [String]?
      let deweyDecimalClass: [String]?
      let isbn10: [String]?
      let publishDate: String?
   //   let works: [KeyRef]?
    //let type: KeyRef?
        //    let languages: [KeyRef]?
          //     let tableOfContents: [TOCItem]?
    //    let created: TimestampValue?
    // let identifiers: Identifiers?
    //     let lastModified: TimestampValue?
    //    let description: DescriptionValue?
    }



//  Comic.swift
//  panel-journey
//
//  Created by Dare on 2025-12-30.
//

