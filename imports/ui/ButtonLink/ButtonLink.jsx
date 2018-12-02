import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'bloomer';

import './button-link.css';

/**
 * @param {{
 *  isColor?: string,
 *  to: string,
 *  onClick?: React.MouseEventHandler<HTMLButtonElement>,
 * } & import('react-router').RouteComponentProps<{
 *  history: object,
 *  location: object,
 *  match: object,
 *  staticContext: object,
 * }>} Props
 */
const ButtonLink = ({ history, location, match, staticContext, to, onClick, ...rest }) => (
	<Button
		{...rest}
		onClick={/** @param {React.MouseEvent<HTMLButtonElement>} ev */ ev => {
			onClick && onClick(ev);
			history.push(to);
		}} />
);

/**
 * @typeof {ButtonLink}
 */
export default withRouter(ButtonLink);
