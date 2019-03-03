import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

/**
 * @type {{
 * 	forgotPassword?: (email: string)=>Promise<string>,
 * 	isSignedIn: boolean,
 * 	loading: boolean,
 * 	login?: (args: { email: string, password: string, remember: boolean })=>Promise<string>,
 * 	logout?: ()=>void,
 * 	user: any,
 * }}
 */
const INITIAL_STATE = {
	forgotPassword: undefined,
	isSignedIn: false,
	loading: false,
	login: undefined,
	logout: undefined,
	user: null,
};

const AuthContext = React.createContext(INITIAL_STATE);

class AuthProvider extends Component {
	state = INITIAL_STATE;

	componentDidMount () {
		Auth.currentAuthenticatedUser()
			.then(user => {
				this.setState({ isSignedIn: true, user });
			})
			.catch(err => {
				this.setState({ isSignedIn: false, user: null });
			});
	}

	/**
	 * @param {string} email
	 * @returns Promise<string>
	 */
	forgotPassword = email => Auth.forgotPassword(email);

	/**
	 * @param {{ email: string, password: string, remember: boolean }} args
	 * @returns Promise<string>
	 */
	login = async ({ email, password, remember }) => {
		try {
			const user = await Auth.signIn(email, password);
			let loggedUser;
			let code = '';

			switch (user.challengeName) {
				case 'SMS_MFA':
				case 'SOFTWARE_TOKEN_MFA':
					// You need to get the code from the UI inputs
					// and then trigger the following function with a button click
					//code = getCodeFromUserInput();

					// If MFA is enabled, sign-in should be confirmed with the confirmation code
					loggedUser = await Auth.confirmSignIn(
						user,              // Return object from Auth.signIn()
						code,              // Confirmation code
						user.challengeName // MFA Type e.g. SMS, TOTP.
					);
					this.setState({ isSignedIn: true, user: loggedUser });

					return Promise.resolve('');
				case 'NEW_PASSWORD_REQUIRED':
					//const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']

					// You need to get the new password and required attributes from the UI inputs
					// and then trigger the following function with a button click
					// For example, the email and phone_number are required attributes
					loggedUser = await Auth.completeNewPassword(user, password, {
						email,
						family_name: 'Duffey',
						given_name: 'Brian',
					});
					this.setState({ isSignedIn: true, user: loggedUser });

					return Promise.resolve('');
				case 'MFA_SETUP':
					// This happens when the MFA method is TOTP
					// The user needs to setup the TOTP before using it
					// More info please check the Enabling MFA part
					return Auth.setupTOTP(user);
				default:
					this.setState({ isSignedIn: true, user });

					return Promise.resolve('');
			}
		} catch (err) {
			switch (err.code) {
				case 'UserNotConfirmedException':
					// The error happens if the user didn't finish the confirmation step when signing up
					// In this case you need to resend the code and confirm the user
					// About how to resend the code and confirm the user, please check the signUp part
					console.log('TODO', err);

					return Promise.reject(err.message);
				case 'PasswordResetRequiredException':
					// The error happens when the password is reset in the Cognito console
					// In this case you need to call forgotPassword to reset the password
					// Please check the Forgot Password part.
					console.log('TODO', err);

					return Promise.reject(err.message);
				default:
					console.log('TODO', err);

					return Promise.reject(err.message || err);
			}
		}
	};

	/**
	 * @returns Promise<string>
	 */
	logout = () => Auth.signOut()
		.then(() => this.setState({ isSignedIn: false, user: null }));

	render () {
		return (
			<AuthContext.Provider
				value={{
					...this.state,
					forgotPassword: this.forgotPassword,
					login: this.login,
					logout: this.logout,
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
