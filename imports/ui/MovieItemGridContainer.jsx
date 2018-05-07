'use strict';

import { Container } from 'bloomer';
import styled from 'styled-components';

const MovieItemGridContainer = styled(Container)`
	box-sizing: border-box;
	height: calc(100vh - 52px - 52px);
	overflow-y: auto;
	padding: 1px 13px;
`;

export default MovieItemGridContainer;
