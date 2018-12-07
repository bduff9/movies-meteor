import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.css';

import Header from '../Header/Header.jsx';
import Loading from '../Loading/Loading.jsx';

export const AddMovieItemPage = lazy(() => import('../AddMovieItemPage/AddMovieItemPage.jsx'));
export const EditMovieItemPage = lazy(() => import('../EditMovieItemPage/EditMovieItemPage.jsx'));
export const MovieItemsDisplayPage = lazy(() => import('../MovieItemsDisplayPage/MovieItemsDisplayPage.jsx'));

const App = () => (
	<Router>
		<div className="full-coverage">
			<Header />
			<Suspense fallback={<div><Loading /></div>} key="route-suspense">
				<Switch>
					<Route exact path="/" component={MovieItemsDisplayPage} />
					<Route path="/item/:itemID(\d+)" component={EditMovieItemPage} />
					<Route exact path="/item/add" component={AddMovieItemPage} />
				</Switch>
			</Suspense>
		</div>
	</Router>
);

export default App;
