import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import './app.css';

import AuthenticatedRoute from '../../auth/AuthenticatedRoute';
import { AuthProvider } from '../../auth/auth.service';
import Header from '../Header/Header.jsx';
import Loading from '../Loading/Loading.jsx';
import UnauthenticatedRoute from '../../auth/UnauthenticatedRoute';

export const AddMovieItemPage = lazy(() => import('../AddMovieItemPage/AddMovieItemPage.jsx'));
export const EditMovieItemPage = lazy(() => import('../EditMovieItemPage/EditMovieItemPage.jsx'));
export const LoginPage = lazy(() => import('../LoginPage/LoginPage.jsx'));
export const MovieItemsDisplayPage = lazy(() => import('../MovieItemsDisplayPage/MovieItemsDisplayPage.jsx'));

const App = () => (
	<AuthProvider>
		<Router>
			<div className="full-coverage">
				<Header />
				<Suspense fallback={<div><Loading /></div>} key="route-suspense">
					<Switch>
						<UnauthenticatedRoute path="/login" component={LoginPage} />
						<AuthenticatedRoute exact path="/" component={MovieItemsDisplayPage} />
						<AuthenticatedRoute path="/item/:itemID(\d+)" component={EditMovieItemPage} />
						<AuthenticatedRoute exact path="/item/add" component={AddMovieItemPage} />
					</Switch>
				</Suspense>
			</div>
		</Router>
	</AuthProvider>
);

export default App;
