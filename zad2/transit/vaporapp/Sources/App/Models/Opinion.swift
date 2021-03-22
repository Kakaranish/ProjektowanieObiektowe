import Fluent
import Vapor

final class Opinion: Model, Content {
    static let schema = "opinions"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "content")
    var content: String

    @Parent(key: "offer_id")
    var offer: Offer

    init() { }

    init(id: UUID? = nil, content: String, offer: Offer) {
        self.id = id
        self.content = content
        self.offer = offer
    }
}
