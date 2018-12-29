import React, { PureComponent } from 'react';
import { List, Map } from 'immutable';
import { Box, Button, Control, Field, Input, Label } from 'bloomer';

import './filters.css';

import { Filter } from '../../api/models';

/**
 * @typedef {{
 *  filters: import('immutable').Map<String, any>,
 *  updateFilters: (filters: import('immutable').Map<String, any>) => void,
 * }} Props
 */

/**
 * @typedef {typeof INITIAL_STATE} State
 */
const INITIAL_STATE = {
	caseType: '',
	digitalType: '',
	formatType: '',
	is3D: '',
	isWatched: '',
	itemName: '',
	itemStatus: '',
	releaseDate: List(),
};

/**
 * @param {{
 *  operator: string,
 *  value: any,
 * }} filter
 */
const convertFilterToValue = ({ operator, value }) => {
	switch (operator) {
		case 'like': return value.substring(1, value.length - 1);
		case 'between': return List(value);
		default: return value;
	}
};

/**
 * @type {React.PureComponent<Props, State>}
 */
class Filters extends PureComponent {

	/**
	 * @param {Props} props
	 */
	constructor (props) {
		super(props);

		this.state = this._convertPropsToState(props);
	}

	/**
	 * @param {Props} props
	 */
	_convertPropsToState (props) {
		const { filters } = props;
		/** @type {Object} */
		const { caseType, digitalType, formatType, is3D, isWatched, itemName, itemStatus, releaseDate } = filters.toJS();
		const state = INITIAL_STATE;

		if (caseType) state.caseType = convertFilterToValue(caseType);

		if (digitalType) state.digitalType = convertFilterToValue(digitalType);

		if (formatType) state.formatType = convertFilterToValue(formatType);

		if (is3D) state.is3D = convertFilterToValue(is3D);

		if (isWatched) state.isWatched = convertFilterToValue(isWatched);

		if (itemName) state.itemName = convertFilterToValue(itemName);

		if (itemStatus) state.itemStatus = convertFilterToValue(itemStatus);

		if (releaseDate) state.releaseDate = convertFilterToValue(releaseDate);

		return state;
	}

	/**
	 * @param {React.FormEvent<HTMLFormElement>} ev
	 */
	_convertStateToProps = ev => {
		const { updateFilters } = this.props;
		const { caseType, digitalType, formatType, is3D, isWatched, itemName, itemStatus, releaseDate } = this.state;
		const filters = {};

		ev.preventDefault();

		if (caseType) filters.caseType = Filter('eq', caseType);

		if (digitalType) filters.digitalType = Filter('eq', digitalType);

		if (formatType) filters.formatType = Filter('eq', formatType);

		if (is3D) filters.is3D = Filter('eq', is3D);

		if (isWatched) filters.isWatched = Filter('eq', isWatched);

		if (itemName) filters.itemName = Filter('like', `%${itemName}%`);

		if (itemStatus) filters.itemStatus = Filter('eq', itemStatus);

		if (releaseDate) filters.releaseDate = Filter('between', releaseDate);

		updateFilters(Map(filters));

		return false;
	}

	_resetFilters = () => {
		const { updateFilters } = this.props;

		updateFilters(Map());
	};

	/**
	 * @param {React.ChangeEvent<HTMLInputElement>} ev
	 */
	_updateStateFromForm = ev => {
		const { currentTarget } = ev;
		const { name, value } = currentTarget;

		if (name === 'releaseDate') {
			//TODO: handle release date range by saving into List<string>()

			return;
		}

		this.setState({ [name]: value });
	};

	render () {
		const { caseType, digitalType, formatType, is3D, isWatched, itemName, itemStatus, releaseDate } = this.state;

		return (
			<Box>
				<form onSubmit={this._convertStateToProps}>
					<Field>
						<Label>Name: </Label>
						<Control>
							<Input type="text" name="itemName" placeholder="Search on name" value={itemName} onChange={this._updateStateFromForm} />
						</Control>
					</Field>

					<Field isGrouped>
						<Control>
							<Button isColor="primary" type="submit">Filter</Button>
						</Control>
						<Control>
							<Button isColor="danger" onClick={this._resetFilters}>Reset</Button>
						</Control>
					</Field>
				</form>
			</Box>
		);
	}
}

export default Filters;
