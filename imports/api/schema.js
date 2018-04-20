'use strict';

const typeDefs = [`
type Movie {
	MOVIEID: Int,
	ITEMID: Int,
	MOVIETITLE: String,
	MOVIEURL: String
}

type MovieItem {
	ITEMID: Int,
	ORDERED: Int,
	ITEMNAME: String,
	ITEMCASE: String,
	ITEMDIGITL: String,
	ITEM3D: String,
	ITEMWATCH: String,
	ITEMFORMAT: String,
	ITEMSTATUS: String,
	ITEMAVAIL: String,
	ITEMURL: String,
	ITEMNOTES: String
}

type Query {
	movies (ITEMID: Int): [Movie],
	movieItems (ITEMWATCH: String): [MovieItem]
}

schema {
	query: Query
}
`];

export default typeDefs;
