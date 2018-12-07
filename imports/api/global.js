import React from 'react';
import { format, parse } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * @param {string} str
 */
export const formatForGraphQL = str => str.replace(/[^a-zA-Z0-9]/g, '');

/**
 * @param {string} caseType
 */
export const getCaseIcon = caseType => {
	switch (caseType) {
		case 'Plain':
			return <FontAwesomeIcon icon="square" className="has-text-primary" title={caseType} />;
		case 'Box':
			return <FontAwesomeIcon icon="box" className="has-text-primary" title={caseType} />;
		case 'Slipcover':
			return <FontAwesomeIcon icon={['far', 'square']} className="has-text-primary" title={caseType} />;
		case 'Digibook':
			return <FontAwesomeIcon icon={['far', 'book']} className="has-text-primary" title={caseType} />;
		case 'Steelbook':
			return <FontAwesomeIcon icon="book" className="has-text-primary" title={caseType} />;
		default:
			console.error('Invalid case type passed', caseType);

			return null;
	}
};

/**
 * @param {string} format
 * @param {string} is3D
 */
export const getFormatImage = (format, is3D) => {
	let image = '/images/' + format;

	if (is3D === 'Y') image += '3D';

	return image + '.png';
};

/**
 * @param {string} dateStr
 */
export const getFormattedDate = dateStr => {
	const date = parse(dateStr, 'yyyy-MM-dd', new Date());

	if (date.toString() === 'Invalid Date') return dateStr;

	if (dateStr === '1970-01-01') return '';

	return format(date, 'EEE MMM do, yyyy');
};

/**
 * @param {string} status
 */
export const getStatusIcon = status => {
	switch (status) {
		case 'Owned':
			return <FontAwesomeIcon icon="check" className="has-text-success" title={status} />;
		case 'Selling':
			return <FontAwesomeIcon icon={['far', 'money-bill-alt']} className="has-text-success" title={status} />;
		case 'Wanted':
			return <FontAwesomeIcon icon={['far', 'clipboard']} className="" title={status} />;
		case 'Waiting':
			return <FontAwesomeIcon icon="truck" className="" title={status} />;
		default:
			console.error('Invalid status passed', status);

			return null;
	}
};
