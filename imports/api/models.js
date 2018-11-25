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
 * @param {number} id
 * @param {string} itemName
 * @param {string} formatType
 * @param {string} is3D
 * @param {string} digitalType
 * @param {string} caseType
 * @param {string} itemStatus
 * @param {string} releaseDate
 * @param {string} isWatched
 * @param {string?} itemURL
 */
export const MovieItem = (id, itemName, formatType, is3D, digitalType, caseType, itemStatus, releaseDate, isWatched, itemURL) => ({
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
});
