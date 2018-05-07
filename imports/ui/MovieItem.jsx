'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardFooter, CardFooterItem, CardHeader, CardHeaderTitle, CardImage, Column, Image, Media, MediaContent, MediaLeft } from 'bloomer';

import { getCaseIcon, getFormatImage, getFormattedDate, getStatusIcon } from '../api/global';

/** @type {React.StatelessComponent} */
const MovieItem = ({ movieItem, selectMovieItem }) => {
	const selectThisMovieItem = ev => {
		selectMovieItem(movieItem.itemID);
	};

	return (
		<Column className="is-one-fifth">
			<Card>
				<CardHeader>
					<CardHeaderTitle className="item-title" title={movieItem.itemName}>{movieItem.itemName}</CardHeaderTitle>
				</CardHeader>
				<CardImage className="item-image">
					<Image className="is-3by4" src={movieItem.itemURL || 'https://via.placeholder.com/239x180'} />
				</CardImage>
				<CardContent>
					<Media>
						<MediaLeft>
							<Image isSize="48x48" src={getFormatImage(movieItem.formatType, movieItem.is3D)} />
						</MediaLeft>
						<MediaContent>
							<span className="item-attribute has-text-centered item-uv" title={movieItem.digitalType}>
								{movieItem.digitalType.indexOf('UV') > -1 ? 'UV' : null}
							</span>
							<span className="item-attribute has-text-centered item-dc" title={movieItem.digitalType}>
								{movieItem.digitalType.indexOf('DC') > -1 ? 'DC' : null}
							</span>
							<span className="item-attribute has-text-centered" title={movieItem.caseType}>
								{getCaseIcon(movieItem.caseType)}
							</span>
							<span className="item-attribute has-text-centered" title={movieItem.itemStatus}>
								{getStatusIcon(movieItem.itemStatus)}
							</span>
							<br />
							<small>{getFormattedDate(movieItem.releaseDate)}</small>
						</MediaContent>
					</Media>
				</CardContent>
				<CardFooter>
					<CardFooterItem href="javascript:void(0);" onClick={selectThisMovieItem}>Edit</CardFooterItem>
					{movieItem.isWatched === 'Y' ?
						<CardFooterItem hasTextColor="success">Watched</CardFooterItem>
						:
						<CardFooterItem href="javascript:void(0);" onClick={null}>Mark Watched</CardFooterItem>
					}
				</CardFooter>
			</Card>
		</Column>
	);
};

MovieItem.propTypes = {
	movieItem: PropTypes.object.isRequired,
	selectMovieItem: PropTypes.func.isRequired,
};

export default MovieItem;
