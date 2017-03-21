(function (angular) {
	'use strict';

	/**
	 * @param localStorageService
	 * @param $q
	 * @constructor
	 */
	function UserAuthProvider(localStorageService) {
		var that = this;

		/**
		 * @type {user}
		 */
		that.user = null;

		/**
		 *
		 * @type {null}
		 */
		that.auth = null;

		/**
		 * @returns {user|{access_token: (*|null), expires_in: (string|*), refresh_token: (*|string), token_type: (string|*)}|*}
		 */
		that.getUser = function () {
			var userData = localStorageService.get('user');

			if (!userData) {
				userData = {
					'access_token': null,
					'expires_in': "",
					'refresh_token': "",
					'token_type': ""
				}
			}
			that.user = {
				'access_token': userData.access_token,
				'expires_in': userData.expires_in,
				'refresh_token': userData.refresh_token,
				'token_type': userData.token_type
			};

			return that.user;
		};

		/**
		 * @returns {String}
		 */
		that.getAccessToken = function () {
			return that.getUser().access_token;
		};

		/**
		 * @returns {boolean}
		 */
		that.isAuthenticated = function () {
			return that.getAccessToken() != null;
		};

		/**
		 * @param provider
		 * @returns {user|{access_token: (*|null), expires_in: (string|*), refresh_token: (*|string), token_type: (string|*)}|*}
		 */
		that.authenticate = function (provider) {
			that.auth.authenticate(provider)
				.then(function (response) {
					localStorageService.set('user', angular.fromJson(response.data));
				})
				.catch(function (error) {
					console.log(error);
				});

			return that.getUser();
		};

		/**
		 * @returns {boolean}
		 */
		that.logout = function () {
			localStorageService.remove('user');

			return that.getUser();
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
		'localStorageService'
	];
})(angular);
