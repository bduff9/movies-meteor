'use strict';

import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export const getFormatImage = (format, is3D) => {
	let image = '/images/' + format;

	if (is3D === 'Y') image += '3D';

	return image + '.png';
};

export const getFormattedDate = dateStr => {
	if (dateStr === '1970-01-01') return '';

	return moment(dateStr).format('ddd MMM Do, YYYY');
};

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
