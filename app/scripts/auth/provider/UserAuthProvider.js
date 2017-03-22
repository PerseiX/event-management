(function (angular) {
	'use strict';

	/**
	 * @param localStorageService
	 * @param $q
	 * @constructor
	 */
	function UserAuthProvider(localStorageService, $q) {
		var that = this;

		/**
		 * @type {user}
		 */
		that.user = null;

		/**
		 * @type {boolean}
		 */
		that.authenticated = false;

		/**
		 *
		 * @type {null}
		 */
		that.auth = null;

		/**
		 * @returns {null|{access_token: *, expires_in: *, refresh_token: *, token_type: *}|*|user}
		 */
		that.getUser = function () {
			return that.user;
		};

		/**
		 * @returns {String}
		 */
		that.getAccessToken = function () {
			return that.user.access_token;
		};

		/**
		 * @returns {boolean}
		 */
		that.isAuthenticated = function () {
			return that.authenticated;
		};

		/**
		 * @param provider
		 * @returns {user|{access_token: (*|null), expires_in: (string|*), refresh_token: (*|string), token_type: (string|*)}|*}
		 */
		that.authenticate = function (provider) {

			return auth(provider).then(function (user) {
				that.authenticated = true;
				that.user = {
					'access_token': user.access_token,
					'expires_in': user.expires_in,
					'refresh_token': user.refresh_token,
					'token_type': user.token_type
				};
			});
		};

		/**
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
			that.user = null;
			that.authenticated = false;

			return true;
		};

		/**
		 * @param auth
		 */
		that.setAuth = function (auth) {
			that.auth = auth;
		};
	}

	angular
		.module('eventManagementApp')
		.service('UserAuthProvider', UserAuthProvider);

	UserAuthProvider.$inject = [
		'localStorageService',
		'$q'
	];
})(angular);
