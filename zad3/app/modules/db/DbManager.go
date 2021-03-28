package db

import (
	"database/sql"
	"log"
	"sync"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

const DbType = "sqlite3"
const DbPath = "./server.db"

type DbManager struct {
	createdAt time.Time
	db        *sql.DB
}

var singleton *DbManager
var once sync.Once

func GetInstance() *DbManager {
	once.Do(func() {
		singleton = &DbManager{}
		singleton.createdAt = time.Now()
	})
	return singleton
}

func (st *DbManager) OpenConnection() {
	db, err := sql.Open(DbType, DbPath)
	if err != nil {
		log.Fatal("Opening DB connection failed")
	}
	st.db = db
	log.Print("DB connection opened")
}

func (st *DbManager) CloseConnection() {
	if st.db == nil {
		log.Fatal("DB connection must be open before close")
	}
	st.db.Close()
	log.Print("DB connection closed")
}

func (st *DbManager) Query(query string) (*sql.Rows, error) {
	if st.db == nil {
		log.Fatal("DB connection must be open before query")
	}

	rows, err := st.db.Query(query)
	if err != nil {
		return nil, err
	}

	return rows, err
}

func (st *DbManager) Exec(query string) error {
	if st.db == nil {
		log.Fatal("DB connection must be open before query")
	}

	stmt, err := st.db.Prepare(query)
	if err != nil {
		return err
	}

	_, err = stmt.Exec()
	if err != nil {
		return err
	}

	return nil
}

func (st *DbManager) GetCreatedAt() string {
	return st.createdAt.String()
}
