import Fluent
import Vapor

final class Offer: Model, Content {
    static let schema = "offers"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "name")
    var name: String

    @Field(key: "price")
    var price: Double

    @Field(key: "stock")
    var stock: Int

    @OptionalParent(key: "category_id")
    var category: Category?

    @Children(for: \.$offer)
    var opinions: [Opinion]

    init() { }

    init(id: UUID? = nil, name: String, price: Double, stock: Int) {
        self.id = id
        self.name = name
        self.price = price
        self.stock = stock
    }
}
