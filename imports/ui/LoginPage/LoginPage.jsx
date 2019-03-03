import React, { useState } from 'react';
import {
	Button,
	Card,
	Content,
	CardHeader,
	Control,
	Field,
	Input,
	Label,
	Level,
	LevelLeft,
	LevelRight,
	Title,
} from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './login-page.css';

import { AuthConsumer } from '../../auth/auth.service';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [viewPassword, setViewPassword] = useState(false);

	return (
		<div className="login-page">
			<Card className="login-card">
				<CardHeader hasTextAlign="centered">
					<Title hasTextColor="white">Please Sign In</Title>
				</CardHeader>
				<Content>
					<AuthConsumer>
						{({ forgotPassword, login }) => (
							<form onSubmit={ev => {
								ev.preventDefault();
								setLoading(true);
								login({ email, password, remember })
									.catch(err => {
										setLoading(false);
										setError(err);
									});

								return false;
							}}>
								{error && <Title isSize={5} hasTextColor="danger">{error}</Title>}
								<Field>
									<Control hasIcons="left">
										<Input id="email" type="email" name="email" title="email" placeholder="Email" required autoFocus onChange={ev => setEmail(ev.target.value)} />
										<span className="icon is-left is-small">
											<FontAwesomeIcon icon="envelope" />
										</span>
									</Control>
								</Field>
								<Field hasAddons>
									<Control hasIcons="left">
										<Input id="password" type={viewPassword ? 'text' : 'password'} name="password" title="password" placeholder="Password" required onChange={ev => setPassword(ev.target.value)} />
										<span className="icon is-left is-small">
											<FontAwesomeIcon icon="lock" />
										</span>
									</Control>
									<Control>
										<Button className="toggle-password" onClick={() => setViewPassword(!viewPassword)}>
											{viewPassword
												? <FontAwesomeIcon icon="eye-slash" />
												: <FontAwesomeIcon icon="eye" />
											}
										</Button>
									</Control>
								</Field>
								<Level>
									<LevelLeft>
										<Input type="checkbox" id="checkbox" className="checkbox" onChange={ev => setRemember(ev.target.checked)} />
										<Label htmlFor="checkbox"></Label>
										<span>Remember me</span>
									</LevelLeft>
									<LevelRight>
										<a href="#" className="login-link" onClick={() => forgotPassword(email).catch(setError)}>Forgot Password?</a>
									</LevelRight>
								</Level>
								<Field>
									<Control>
										<Button type="submit" className="login-button" isColor="primary" isOutlined isLoading={loading}>Login</Button>
									</Control>
								</Field>
							</form>
						)}
					</AuthConsumer>
				</Content>
			</Card>
		</div>
	);
};

export default LoginPage;
