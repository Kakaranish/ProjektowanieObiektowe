import Fluent
import Vapor

struct CategoriesController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let categories = routes.grouped("categories")
        categories.get(use: getAll)
        categories.post(use: create)
        categories.group(":categoryId") { category in
            category.get(use: getById)
            category.delete(use: delete)
            category.put(use: update)
        }
    }

    func getAll(req: Request) throws -> EventLoopFuture<[Category]> {
        return Category.query(on: req.db).all()
    }

    func getById(req: Request) throws -> EventLoopFuture<Category> {
        return Category.find(req.parameters.get("categoryId"), on: req.db)
            .unwrap(or: Abort(.notFound))
    }

    func create(req: Request) throws -> EventLoopFuture<Category> {
        let category = try req.content.decode(Category.self)
        return category.save(on: req.db).map { category }
    }

    func delete(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        return Category.find(req.parameters.get("categoryId"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .ok)
    }
}
