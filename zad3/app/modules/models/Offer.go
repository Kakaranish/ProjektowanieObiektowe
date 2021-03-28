package models

type Offer struct {
	Id       string  `json:"id" xml:"id" form:"id" query:"id"`
	Name     string  `json:"name" xml:"name" form:"name" query:"name"`
	Price    float32 `json:"price" xml:"price" form:"price" query:"price"`
	Quantity int32   `json:"quantity" xml:"quantity" form:"quantity" query:"quantity"`
}
