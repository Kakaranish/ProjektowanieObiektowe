import Fluent

struct OfferMigration: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("offers")
            .id()
            .field("name", .string, .required)
            .field("price", .int32, .required)
            .field("stock", .double, .required)
            .field("category_id", .uuid, .references("categories", "id"))
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("offers").delete()
    }
}
