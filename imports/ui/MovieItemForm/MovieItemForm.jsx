import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Column, Control, Field, Help, Image, Input, Label, Radio, Select, TextArea } from 'bloomer';

import './movie-item-form.css';

import { DIGITAL_TYPES, FORMAT_TYPES, ITEM_CASES, ITEM_FORMATS, ITEM_DIGITAL_TYPES, ITEM_STATUSES, YES_NO } from '../../api/constants';
import { formatForGraphQL } from '../../api/global';
import ButtonLink from '../ButtonLink/ButtonLink';
import MovieItemPlaceholder from '../MovieItemPlaceholder/MovieItemPlaceholder';

/**
 * @typedef {{
 *  movieItem: import('../../api/models').MovieItem,
 *  onSubmit: (movieItem: import('../../api/models').MovieItem, extra: object) => void,
 * }} Props
 */

/**
 * @type {React.StatelessComponent<Props>}
 */
const MovieItemForm = ({ movieItem, onSubmit }) => (
	<Formik
		initialValues={movieItem}
		onSubmit={onSubmit}
		validationSchema={Yup.object().shape({
			itemName: Yup.string().required('Please enter title'),
			formatType: Yup.string().oneOf(Object.keys(FORMAT_TYPES), 'Please select a valid format').required('Please select a format'),
			is3D: Yup.string().oneOf(YES_NO).required('Please select whether this is 3D'),
			digitalType: Yup.string().oneOf(Object.keys(DIGITAL_TYPES)).required('Please select which digital type this item includes'),
			caseType: Yup.string().oneOf(ITEM_CASES).required('Please select the case type'),
			itemStatus: Yup.string().oneOf(ITEM_STATUSES).required('Please select an item status'),
			releaseDate: Yup.date().required('Please enter a valid release date'),
			isWatched: Yup.string().oneOf(YES_NO).required('Please select whether this has been watched'),
			itemURL: Yup.string().url('Please enter a valid image URL').required('Please enter an image URL'),
			itemNotes: Yup.string().nullable(true),
		})}>
		{({
			dirty,
			errors,
			isSubmitting,
			touched,
			values,
			handleBlur,
			handleChange,
			handleReset,
			handleSubmit,
		}) => (
			<form onSubmit={handleSubmit}>
				<Column>
					<ButtonLink isColor="danger" to="/">Return</ButtonLink>
					&nbsp;
					<Button isColor="warning" type="button" disabled={!dirty || isSubmitting} onClick={handleReset}>Reset</Button>
					&nbsp;
					<Button isColor="primary" type="submit" disabled={isSubmitting}>Save</Button>
					{Object.keys(errors).length > 0 && <Help isColor="danger">Please fix the {Object.keys(errors).length} errors below</Help>}
				</Column>

				<Field>
					<Label>Title</Label>
					<Control>
						<Input
							id="itemName"
							name="itemName"
							isColor={errors.itemName && touched.itemName ? 'danger' : undefined}
							value={values.itemName}
							type="text"
							placeholder="Title"
							onBlur={handleBlur}
							onChange={handleChange} />
					</Control>
					{errors.itemName && touched.itemName && <Help isColor="danger">{errors.itemName}</Help>}
				</Field>

				<Field>
					<Label>Format</Label>
					<Control>
						<Select
							id="formatType"
							name="formatType"
							isColor={errors.formatType && touched.formatType ? 'danger' : undefined}
							value={values.formatType || 'UltraHD'}
							onChange={handleChange}>
							{ITEM_FORMATS.map(format => (
								<option value={formatForGraphQL(format)} key={`format-${format}`}>{format}</option>
							))}
						</Select>
					</Control>
					{errors.formatType && touched.formatType && <Help isColor="danger">{errors.formatType}</Help>}
				</Field>

				<Field>
					<Label>3D?</Label>
					<Control>
						<Radio
							id="is3D-Y"
							name="is3D"
							value="Y"
							onChange={handleChange}
							checked={values.is3D === 'Y'}> Yes </Radio>
						<Radio
							id="is3D-N"
							name="is3D"
							value="N"
							onChange={handleChange}
							checked={values.is3D !== 'Y'}> No </Radio>
					</Control>
					{errors.is3D && touched.is3D && <Help isColor="danger">{errors.is3D}</Help>}
				</Field>

				<Field>
					<Label>Included Digital</Label>
					<Control>
						<Select
							id="digitalType"
							name="digitalType"
							isColor={errors.digitalType && touched.digitalType ? 'danger' : undefined}
							value={values.digitalType}
							onChange={handleChange}>
							{ITEM_DIGITAL_TYPES.map(type => (
								<option value={formatForGraphQL(type)} key={`digital-${type}`}>{type}</option>
							))}
						</Select>
					</Control>
					{errors.digitalType && touched.digitalType && <Help isColor="danger">{errors.digitalType}</Help>}
				</Field>

				<Field>
					<Label>Case Type</Label>
					<Control>
						<Select
							id="caseType"
							name="caseType"
							isColor={errors.caseType && touched.caseType ? 'danger' : undefined}
							value={values.caseType}
							onChange={handleChange}>
							{ITEM_CASES.map(caseType => (
								<option value={caseType} key={`case-${caseType}`}>{caseType}</option>
							))}
						</Select>
					</Control>
					{errors.caseType && touched.caseType && <Help isColor="danger">{errors.caseType}</Help>}
				</Field>

				<Field>
					<Label>Status</Label>
					<Control>
						<Select
							id="itemStatus"
							name="itemStatus"
							isColor={errors.itemStatus && touched.itemStatus ? 'danger' : undefined}
							value={values.itemStatus}
							onChange={handleChange}>
							{ITEM_STATUSES.map(status => (
								<option value={status} key={`status-${status}`}>{status}</option>
							))}
						</Select>
					</Control>
					{errors.itemStatus && touched.itemStatus && <Help isColor="danger">{errors.itemStatus}</Help>}
				</Field>

				<Field>
					<Label>Release Date</Label>
					<Control>
						<Input
							id="releaseDate"
							name="releaseDate"
							isColor={errors.releaseDate && touched.releaseDate ? 'danger' : undefined}
							value={values.releaseDate}
							type="date"
							placeholder="Release Date"
							onBlur={handleBlur}
							onChange={handleChange} />
					</Control>
					{errors.releaseDate && touched.releaseDate && <Help isColor="danger">{errors.releaseDate}</Help>}
				</Field>

				<Field>
					<Label>Watched?</Label>
					<Control>
						<Radio
							id="isWatched-Y"
							name="isWatched"
							value="Y"
							onChange={handleChange}
							checked={values.isWatched === 'Y'}> Yes </Radio>
						<Radio
							id="isWatched-N"
							name="isWatched"
							value="N"
							onChange={handleChange}
							checked={values.isWatched !== 'Y'}> No </Radio>
					</Control>
					{errors.isWatched && touched.isWatched && <Help isColor="danger">{errors.isWatched}</Help>}
				</Field>

				<Field>
					<Label>Image</Label>
					<Control>
						<Input
							id="itemURL"
							name="itemURL"
							isColor={errors.itemURL && touched.itemURL ? 'danger' : undefined}
							value={values.itemURL}
							type="text"
							placeholder="Image URL"
							onBlur={handleBlur}
							onChange={handleChange} />
					</Control>
					{errors.itemURL && touched.itemURL && <Help isColor="danger">{errors.itemURL}</Help>}
				</Field>

				<div style={{ width: 114 }}>
					{values.itemURL ?
						<Image className="is-3by4" src={values.itemURL} />
						:
						<MovieItemPlaceholder title={values.itemName || ''} />
					}
				</div>

				<Field>
					<Label>Notes</Label>
					<Control>
						<TextArea
							id="itemNotes"
							name="itemNotes"
							value={values.itemNotes || ''}
							placeholder="Optional Notes"
							onBlur={handleBlur}
							onChange={handleChange} />
					</Control>
					{errors.itemNotes && touched.itemNotes && <Help isColor="danger">{errors.itemNotes}</Help>}
				</Field>

				<Column>
					<ButtonLink isColor="danger" to="/">Return</ButtonLink>
				&nbsp;
					<Button isColor="warning" type="button" disabled={!dirty || isSubmitting} onClick={handleReset}>Reset</Button>
				&nbsp;
					<Button isColor="primary" type="submit" disabled={isSubmitting}>Save</Button>
				</Column>
			</form>
		)}
	</Formik>
);

export default MovieItemForm;
