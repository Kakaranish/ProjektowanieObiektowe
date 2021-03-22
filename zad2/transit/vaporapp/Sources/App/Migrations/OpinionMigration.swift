import Fluent

struct OpinionMigration: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("opinions")
            .id()
            .field("content", .string, .required)
            .field("offer_id", .uuid, .references("offers", "id"))
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("opinions").delete()
    }
}
