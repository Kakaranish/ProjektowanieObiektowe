package main

import (
	DbManager "awesome/modules/db"
	"awesome/modules/models"
	"fmt"
	"log"
	"net/http"

	"github.com/google/uuid"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.POST("/offers", func(c echo.Context) error {
		offer := new(models.Offer)
		if err := c.Bind(offer); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		offer.Id = uuid.New().String()

		var dbManager = DbManager.GetInstance()
		dbManager.OpenConnection()

		var query = fmt.Sprintf("INSERT INTO Offers (Id, Name, Price, Quantity) values ('%s', '%s', '%f', '%d')", offer.Id, offer.Name, offer.Price, offer.Quantity)
		err := dbManager.Exec(query)
		if err != nil {
			log.Print(err)
			dbManager.CloseConnection()
			return err
		}

		dbManager.CloseConnection()

		return c.JSON(http.StatusOK, offer)
	})

	const port = ":8000"
	e.Logger.Fatal(e.Start(port))
}
