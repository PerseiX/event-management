(function (angular) {
	'use strict';

	/**
	 * @param DataFetcher
	 * @param UserRepository
	 * @param UserAuthentication
	 * @param LocalStorageManager
	 * @constructor
	 */
	function UserManager(DataFetcher, UserRepository, UserAuthentication, LocalStorageManager) {
		var that = this;

		/**
		 * @returns {UserRepository}
		 */
		that.getUser = function () {
			return UserRepository;
		};

		/**
		 * @returns {Boolean}
		 */
		that.isAuthenticated = function () {
			return UserRepository.isAuthenticated();
		};

		/**
		 * @param provider
		 */
		that.login = function (provider) {
			UserAuthentication.authenticate(provider)
				.then(function (tokens) {
					setTokens(tokens);
				})
				.then(function () {
					DataFetcher.GetUserDetail(UserRepository)
						.then(function (User) {
							setUserData(User);
						});
				});
		};


		that.refreshToken = function () {
			DataFetcher.refreshToken(UserRepository)
				.then(function (refreshedUser) {
					LocalStorageManager.saveUser(refreshedUser);
					setTokens(refreshedUser)
				})
				.then(function () {
					DataFetcher.GetUserDetail(UserRepository)
						.then(function (User) {
							setUserData(User);
						});
				});
		};

		that.logout = function () {
			UserAuthentication.logout();
		};

		/**
		 * @param Tokens
		 * @returns {UserRepository}
		 */
		function setTokens(Tokens) {
			return UserRepository
				.setAccessToken(Tokens.access_token)
				.setRefreshToken(Tokens.refresh_token);
		}

		/**
		 * @param user
		 * @returns {UserRepository}
		 */
		function setUserData(user) {
			return UserRepository
				.setUsername(user.username)
				.setClientSecret(user.clientSecret)
				.setAccessTokenExpiresAt(user.accessTokenExpiresAt)
				.setRefreshTokenExpiresAt(user.refreshTokenExpiresAt)
				.setEmail(user.email)
				.setClientId(user.clientIdentify)
				.setIsAuthenticated(true);
		}
	}

	angular.module('eventManagementApp')
		.service('UserManager', UserManager);

	UserManager.$inject = [
		'DataFetcher',
		'UserRepository',
		'UserAuthentication',
		'LocalStorageManager'
	];
})(angular);