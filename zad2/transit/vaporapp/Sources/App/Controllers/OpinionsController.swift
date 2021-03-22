import Fluent
import Vapor

struct OpinionsController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let opinions = routes.grouped("opinions")
        opinions.get(use: getAll)
        opinions.post(use: create)
        opinions.group(":opinionId") { opinion in
            opinion.get(use: getById)
            opinion.delete(use: delete)
        }
    }

    func getAll(req: Request) throws -> EventLoopFuture<[Opinion]> {
        return Opinion.query(on: req.db)
        .join(Offer.self, on: \Opinion.$offer.$id == \Offer.$id)
        .all()
    }

    func getById(req: Request) throws -> EventLoopFuture<Opinion> {
        return Opinion.find(req.parameters.get("opinionId"), on: req.db)
            .unwrap(or: Abort(.notFound))
    }

    func delete(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        return Opinion.find(req.parameters.get("opinionId"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .ok)
    }

    func create(req: Request) throws -> EventLoopFuture<Opinion> {
        let opinion = try req.content.decode(Opinion.self)
        return opinion.save(on: req.db).map { opinion }
    }
}
