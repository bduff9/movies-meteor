import React from 'react';
import { Link } from 'react-router-dom';
import {  Column, Columns, Content, Image, Media, MediaContent, MediaLeft, MediaRight } from 'bloomer';

import './movie-items-list.css';

import { getCaseIcon, getFormatImage, getFormattedDate, getStatusIcon } from '../../api/global';
import Loading from '../Loading/Loading';
import MovieItemGridContainer from '../styled-components/MovieItemGridContainer';
import MovieItemPlaceholder from '../MovieItemPlaceholder/MovieItemPlaceholder';
import ToggleMovieItemWatched from '../ToggleMovieItemWatched/ToggleMovieItemWatched';

/**
 * @param {{
 *  loading: boolean,
 *  movieItems: import('../../api/models').MovieItem[],
 * }} Props
 */
const MovieItemsList = ({ loading, movieItems }) => (
	<MovieItemGridContainer isFluid>
		<Columns isGrid isMultiline>
			{loading ? (
				<Column isSize="full">
					<Loading />
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
	<Column isSize="full">
		<Media>
			<MediaLeft>
				{movieItem.itemURL ?
					<Image className="is-3by4" src={movieItem.itemURL} />
					:
					<MovieItemPlaceholder title={movieItem.itemName} />
				}
			</MediaLeft>
			<MediaContent>
				<Content>
					<p>
						<strong>{movieItem.itemName}</strong>
						<small>{getFormattedDate(movieItem.releaseDate)}</small>
						<br />
						<Image isSize="48x48" src={getFormatImage(movieItem.formatType, movieItem.is3D)} />
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
					</p>
				</Content>
			</MediaContent>
			<MediaRight>
				<Link to={`/item/${movieItem.id}`}>Edit</Link>
				{movieItem.id && <ToggleMovieItemWatched isWatched={movieItem.isWatched === 'Y'} itemID={movieItem.id} />}</MediaRight>
		</Media>
	</Column>
);

export default MovieItemsList;
