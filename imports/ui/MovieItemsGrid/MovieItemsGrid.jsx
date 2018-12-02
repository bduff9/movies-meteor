import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardFooterItem, CardHeader, CardHeaderTitle, CardImage, Column, Columns, Image, Media, MediaContent, MediaLeft } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './movie-items-grid.css';

import { getCaseIcon, getFormatImage, getFormattedDate, getStatusIcon } from '../../api/global';
import MovieItemGridContainer from '../styled-components/MovieItemGridContainer';
import MovieItemPlaceholder from '../MovieItemPlaceholder/MovieItemPlaceholder';
import ToggleMovieItemWatched from '../ToggleMovieItemWatched/ToggleMovieItemWatched';

/**
 * @param {{
 *  loading: boolean,
 *  movieItems: import('../../api/models').MovieItem[],
 * }} Props
 */
const MovieItemsGrid = ({ loading, movieItems }) => (
	<MovieItemGridContainer isFluid>
		<Columns isGrid isMultiline>
			{loading ? (
				<Column isSize="full">
					<FontAwesomeIcon icon="spinner" spin />
					&nbsp; Loading...
				</Column>
			)
				:
				movieItems && movieItems.map(movieItem =>
					<MovieItem
						movieItem={movieItem}
						key={`movie-item-${movieItem.id}`} />
				)}
		</Columns>
	</MovieItemGridContainer>
);

/**
 * @typedef {{
 *  movieItem: import('../../api/models').MovieItem,
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const MovieItem = ({ movieItem }) => (
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
				<CardFooterItem>
					<Link to={`/item/${movieItem.id}`}>Edit</Link>
				</CardFooterItem>
				{movieItem.id && <ToggleMovieItemWatched isWatched={movieItem.isWatched === 'Y'} itemID={movieItem.id} />}
			</CardFooter>
		</Card>
	</Column>
);

export default MovieItemsGrid;
