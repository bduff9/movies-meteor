import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';

import AddMovieItemPage from '../AddMovieItemPage/AddMovieItemPage.jsx';
import EditMovieItemPage from '../EditMovieItemPage/EditMovieItemPage.jsx';
import Header from '../Header/Header.jsx';
import MovieItemsDisplayPage from '../MovieItemsDisplayPage/MovieItemsDisplayPage.jsx';

const App = () => (
	<Router>
		<div className="full-coverage">
			<Header />
			<Route exact path="/" component={MovieItemsDisplayPage} />
			<Route path="/item/:itemID(\d+)" component={EditMovieItemPage} />
			<Route exact path="/item/add" component={AddMovieItemPage} />
		</div>
	</Router>
);

export default App;
