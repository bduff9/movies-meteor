import { Container } from 'bloomer';
import styled from 'styled-components';

const MovieItemGridContainer = styled(Container)`
	height: ${({ offset = '104px' }) => `calc(100vh - ${offset});`}
	overflow-y: auto;
	padding: 1px 13px;
`;

export default MovieItemGridContainer;
