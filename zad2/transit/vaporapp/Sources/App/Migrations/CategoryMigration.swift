import Fluent

struct CategoryMigration: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("categories")
            .id()
            .field("name", .string, .required)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("categories").delete()
    }
}
