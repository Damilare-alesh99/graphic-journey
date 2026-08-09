import SwiftUI

struct Display: View {
    let comic: Comic?

    func defaultCover(for publisher: String?) -> String {
        guard let publisher = publisher?.lowercased() else {
            return "generic"
        }

        switch publisher {
        case let p where p.contains("marvel"):
            return "marvel"

        case let p where p.contains("dc"):
            return "dc"

        case let p where p.contains("dark horse"):
            return "darkHorse"

        case let p where p.contains("image"):
            return "image"

        default:
            return "generic-default"
        }
    }
    
    @ViewBuilder
      func defaultCoverView() -> some View {
          Image(defaultCover(for: comic?.publishers?.first))
              .resizable()
              .scaledToFit()
      }


    var body: some View {
        VStack(spacing: 20) {

            Text("Book Details")
                .font(.title)

            if let coverID = comic?.covers?.first {

                AsyncImage(
                    url: URL(
                        string: "https://covers.openlibrary.org/b/id/\(coverID)-L.jpg"
                    )
                ) { phase in

                    switch phase {

                    case .empty:
                        Image(
                            defaultCover(
                                for: comic?.publishers?.first
                            )
                        )
                        .resizable()
                        .scaledToFit()

                    case .success(let image):
                        image
                            .resizable()
                            .scaledToFit()

                    case .failure:
                        Image(
                            defaultCover(
                                for: comic?.publishers?.first
                            )
                        )
                        .resizable()
                        .scaledToFit()

                    @unknown default:
                        Image(
                            defaultCover(
                                for: comic?.publishers?.first
                            )
                        )
                        .resizable()
                        .scaledToFit()
                    }
                }
                .frame(width: 200, height: 300)

            } else {

                // No Open Library cover ID at all
                Image(
                    defaultCover(
                        for: comic?.publishers?.first
                    )
                )
                .resizable()
                .scaledToFit()
                .frame(width: 200, height: 300)
            }

            Text("Title : \(comic?.title ?? "")")

            Text("Number of Pages : \(comic?.numberOfPages ?? 0)")

            Text("Isbn 13 : \(comic?.isbn13?.first ?? "")")

            HStack {
                Text("Subjects:")

                ForEach(comic?.subjects ?? [], id: \.self) { subject in
                    Text(subject)
                }
            }

            Text("Publish Date : \(comic?.publishDate ?? "")")

            HStack {
                Text("Publisher(s):")

                ForEach(comic?.publishers ?? [], id: \.self) { publisher in
                    Text(publisher)
                }
            }
        }
    }
}
