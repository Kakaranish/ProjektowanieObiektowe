-- SQLite

CREATE TABLE "Offers" (
	"Id"	TEXT NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL,
	"Price"	REAL NOT NULL,
	"Quantity"	INTEGER NOT NULL,
	PRIMARY KEY("Id")
);