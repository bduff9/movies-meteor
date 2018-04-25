'use strict';

const typeDefs = [`
enum YesNo {
	Y
	N
}

enum CaseType {
	Plain
	Box
	Slipcover
	Digibook
	Steelbook
}

enum DigitalType {
	None
	DC
	UV
	DCUV
}

enum FormatType {
	BluRay
	DVD
	UltraHD
	UV
	Digital
}

enum StatusType {
	Owned
	Wanted
	Selling
	Waiting
}

type MovieItem {
	itemID: Int! @relation(name: "ItemID") @isUnique
	orderToWatch: Int
	itemName: String!
	caseType: CaseType!
	digitalType: DigitalType!
	is3D: YesNo!
	isWatched: YesNo!
	formatType: FormatType!
	itemStatus: StatusType!
	releaseDate: String
	itemURL: String!
	itemNotes: String
}

type Movie {
	movieID: Int! @isUnique
	itemID: Int! @relation(name: "ItemID")
	movieTitle: String!
	movieURL: String
}

type Query {
	movies (itemID: Int): [Movie]
	movieItems (isWatched: String): [MovieItem]
}

type Mutation {
	addMovieItem (
		itemName: String!,
		caseType: CaseType,
		digitalType: DigitalType,
		is3D: YesNo,
		isWatched: YesNo,
		formatType: FormatType,
		itemStatus: StatusType,
		releaseDate: String!,
		itemURL: String!,
		itemNotes: String
	): MovieItem

	updateMovieItem (
		itemID: Int!,
		orderToWatch: Int,
		itemName: String,
		caseType: CaseType,
		digitalType: DigitalType,
		is3D: YesNo,
		isWatched: YesNo,
		formatType: FormatType,
		itemStatus: StatusType,
		releaseDate: String,
		itemURL: String,
		itemNotes: String
	): MovieItem

	addMovie (
		itemID: Int!,
		movieTitle: String!,
		movieURL: String
	): Movie

	updateMovie (
		movieID: Int!,
		itemID: Int,
		movieTitle: String,
		movieURL: String
	): Movie
}

schema {
	query: Query
	mutation: Mutation
}
`];

export default typeDefs;
