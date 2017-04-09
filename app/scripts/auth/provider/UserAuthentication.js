(function (angular) {
	'use strict';

	/**
	 * @param localStorageService
	 * @param $q
	 * @param UserRepository
	 * @constructor
	 */
	function UserAuthentication(localStorageService, $q, UserRepository) {
		var that = this;

		/**
		 * @returns {UserRepository}
		 */
		that.getUser = function () {
			return UserRepository;
		};

		/**
		 * @type {auth}
		 */
		that.auth = null;

		/**
		 * @param auth
		 */
		that.setAuth = function (auth) {
			that.auth = auth;
		};


		/**
		 * @param provider
		 * @returns {user|{access_token: (*|null), expires_in: (string|*), refresh_token: (*|string), token_type: (string|*)}|*}
		 */
		that.authenticate = function (provider) {
			return auth(provider)
				.then(function (user) {
					UserRepository
						.setAccessToken(user.access_token)
						.setRefreshToken(user.refresh_token);
				})
				.then(function () {
					UserRepository.setIsAuthenticated(true);
				});
		};

		/**js
		 * @param provider
		 * @returns {IPromise<user>}
		 */
		function auth(provider) {
			var deferred = $q.defer();
			var user = localStorageService.get('user');

			if (null == user) {
				that.auth.authenticate(provider)
					.then(function (response) {
						localStorageService.set('user', angular.fromJson(response.data));
						deferred.resolve(angular.fromJson(response.data))
					})
			}
			else {
				deferred.resolve(user)
			}

			return deferred.promise;
		}

		/**
		 * @returns {boolean}
		 */
		that.logout = function () {
			localStorageService.remove('user');
			UserRepository.setIsAuthenticated(false);

			return true;
		};
	}

	angular
		.module('eventManagementApp')
		.service('UserAuthentication', UserAuthentication);

	UserAuthentication.$inject = [
		'localStorageService',
		'$q',
		'UserRepository'
	];
})(angular);
