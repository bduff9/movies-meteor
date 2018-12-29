/**
 * @typedef {ReturnType<typeof SavedView>} SavedView
 */

/**
 * @param {number} id
 * @param {string} name
 * @param {Object} metadata TODO: Replace with metadata model once defined
 */
export const SavedView = (id, name, metadata) => ({
	id,
	name,
	metadata,
});

/**
 * @typedef {ReturnType<typeof MovieItem>} MovieItem
 */

/**
 * @param {number=} id
 * @param {string=} itemName
 * @param {string=} formatType
 * @param {string=} is3D
 * @param {string=} digitalType
 * @param {string=} caseType
 * @param {string=} itemStatus
 * @param {string=} releaseDate
 * @param {string=} isWatched
 * @param {string=} itemURL
 * @param {string=} itemNotes
 */
export const MovieItem = (id, itemName = '', formatType = 'UltraHD', is3D = 'N', digitalType = 'None', caseType = 'Plain', itemStatus = 'Owned', releaseDate = '1970-01-01', isWatched = 'N', itemURL = '', itemNotes = '') => ({
	id,
	itemName,
	formatType,
	is3D,
	digitalType,
	caseType,
	itemStatus,
	releaseDate,
	isWatched,
	itemURL,
	itemNotes,
});

/**
 * @param {number=} id
 * @param {number=} itemID
 * @param {string} movieTitle
 * @param {string} movieURL
 */
export const Movie = (id, itemID, movieTitle = '', movieURL = '') => ({
	id,
	itemID,
	movieTitle,
	movieURL,
});

/**
 * @param {string} operator
 * @param {any} value
 */
export const Filter = (operator, value) => ({
	operator,
	value,
});
