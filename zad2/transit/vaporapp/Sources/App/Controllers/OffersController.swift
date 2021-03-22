import Fluent
import Vapor

struct OffersController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let offers = routes.grouped("offers")
        offers.get(use: getAll)
        offers.post(use: create)
        offers.group(":offerId") { offer in
            offer.get(use: getById)
            offer.delete(use: delete)
        }
    }

    func getAll(req: Request) throws -> EventLoopFuture<[Offer]> {
        return Offer.query(on: req.db)
            .join(Category.self, on: \Offer.$category.$id == \Category.$id)
            .all()
    }

    func getById(req: Request) throws -> EventLoopFuture<Offer> {
        return Offer.find(req.parameters.get("offerId"), on: req.db)
            .unwrap(or: Abort(.notFound))
    }

    func delete(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        return Offer.find(req.parameters.get("offerId"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .ok)
    }

    func create(req: Request) throws -> EventLoopFuture<Offer> {
        let offer = try req.content.decode(Offer.self)
        return offer.save(on: req.db).map { offer }
    }
}
