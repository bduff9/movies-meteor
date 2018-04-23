'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardFooter, CardFooterItem, CardHeader, CardHeaderTitle, CardImage, Column, Content, Image } from 'bloomer';

class MovieItem extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		const { movieItem } = this.props;

		return (
			<Column isSize="1/4">
				<Card>
					<CardHeader>
						<CardHeaderTitle>{movieItem.itemName}</CardHeaderTitle>
					</CardHeader>
					<CardImage>
						<Image isRatio="4:3" src={movieItem.itemURL} />
					</CardImage>
					<CardContent>
						<Content>
							Released: {movieItem.releaseDate}
						</Content>
					</CardContent>
					<CardFooter>
						<CardFooterItem href="javascript:void(0);">Edit</CardFooterItem>
						{movieItem.isWatched === 'Y' ?
							<CardFooterItem hasTextColor="success">Watched</CardFooterItem>
							:
							<CardFooterItem href="javascript:void(0);">Mark Watched</CardFooterItem>
						}
					</CardFooter>
				</Card>
			</Column>
		);
	}
}

MovieItem.propTypes = {
	movieItem: PropTypes.object.isRequired
};

export default MovieItem;
