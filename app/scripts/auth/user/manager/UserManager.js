(function (angular) {
	'use strict';

	/**
	 * @param DataFetcher
	 * @param UserRepository
	 * @param UserAuthentication
	 * @constructor
	 */
	function UserManager(DataFetcher, UserRepository, UserAuthentication) {
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
		 * @returns {IPromise<>}
		 */
		that.login = function (provider) {
			return UserAuthentication.authenticate(provider)
				.then(function () {
					DataFetcher.GetUserDetail(UserRepository)
						.then(function (user) {
							UserRepository
								.setUsername(user.username)
								.setClientSecret(user.clientSecret)
								.setAccessTokenExpiresAt(user.accessTokenExpiresAt)
								.setRefreshTokenExpiresAt(user.refreshTokenExpiresAt)
								.setEmail(user.email)
								.setClientId(user.clientIdentify);
						});
				});
		};


		that.logout = function () {
			UserAuthentication.logout();
		}
	}

	angular.module('eventManagementApp')
		.service('UserManager', UserManager);

	UserManager.$inject = [
		'DataFetcher',
		'UserRepository',
		'UserAuthentication'
	];
})(angular);