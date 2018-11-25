import React from 'react';
import { Card, CardContent, CardFooter, CardFooterItem, CardHeader, CardHeaderTitle, CardImage, Column, Image, Media, MediaContent, MediaLeft } from 'bloomer';

import './movie-item.css';

import { getCaseIcon, getFormatImage, getFormattedDate, getStatusIcon } from '../../api/global';
import ToggleMovieItemWatched from '../ToggleMovieItemWatched/ToggleMovieItemWatched';
import MovieItemPlaceholder from '../MovieItemPlaceholder/MovieItemPlaceholder';

/**
 * @typedef {{
 *  movieItem: import('../../api/models').MovieItem,
 *  view: string,
 *  selectMovieItem: (id: number?) => void,
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const MovieItem = ({ movieItem, selectMovieItem }) => {
	const selectThisMovieItem = () => {
		selectMovieItem(movieItem.id);
	};

	return (
		<Column className="is-one-fifth">
			<Card>
				<CardHeader>
					<CardHeaderTitle className="item-title" title={movieItem.itemName}>{movieItem.itemName}</CardHeaderTitle>
				</CardHeader>
				<CardImage className="item-image">
					{movieItem.itemURL ?
						<Image className="is-3by4" src={movieItem.itemURL} />
						:
						<MovieItemPlaceholder title={movieItem.itemName} />
					}
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
						</MediaContent>
					</Media>
					<small>{getFormattedDate(movieItem.releaseDate)}</small>
				</CardContent>
				<CardFooter style={{ height: 71 }}>
					<CardFooterItem href="javascript:void(0);" onClick={selectThisMovieItem}>Edit</CardFooterItem>
					<ToggleMovieItemWatched isWatched={movieItem.isWatched === 'Y'} itemID={movieItem.id} />
				</CardFooter>
			</Card>
		</Column>
	);
};

export default MovieItem;
