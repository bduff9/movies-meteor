'use strict';

import React from 'react';
import moment from 'moment';
import Icon from '@fortawesome/react-fontawesome';
import fasSquare from '@fortawesome/fontawesome-pro-solid/faSquare';
import fasBox from '@fortawesome/fontawesome-pro-solid/faBox';
import farSquare from '@fortawesome/fontawesome-pro-regular/faSquare';
import farBook from '@fortawesome/fontawesome-pro-regular/faBook';
import fasBook from '@fortawesome/fontawesome-pro-solid/faBook';
import fasCheck from '@fortawesome/fontawesome-pro-solid/faCheck';
import farMoney from '@fortawesome/fontawesome-pro-regular/faMoneyBillAlt';
import farClipboard from '@fortawesome/fontawesome-pro-regular/faClipboardList';
import fasTruck from '@fortawesome/fontawesome-pro-solid/faTruck';

export const getCaseIcon = caseType => {
	switch (caseType) {
		case 'Plain':
			return <Icon icon={fasSquare} className="has-text-primary" title={caseType} />;
		case 'Box':
			return <Icon icon={fasBox} className="has-text-primary" title={caseType} />;
		case 'Slipcover':
			return <Icon icon={farSquare} className="has-text-primary" title={caseType} />;
		case 'Digibook':
			return <Icon icon={farBook} className="has-text-primary" title={caseType} />;
		case 'Steelbook':
			return <Icon icon={fasBook} className="has-text-primary" title={caseType} />;
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
			return <Icon icon={fasCheck} className="has-text-success" title={status} />;
		case 'Selling':
			return <Icon icon={farMoney} className="has-text-success" title={status} />;
		case 'Wanted':
			return <Icon icon={farClipboard} className="" title={status} />;
		case 'Waiting':
			return <Icon icon={fasTruck} className="" title={status} />;
		default:
			console.error('Invalid status passed', status);
			return null;
	}
};
