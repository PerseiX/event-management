(function (angular) {
	'use strict';

	function UserRepository() {
		var that = this;

		/**
		 * @type {Object}
		 */
		that.user = {};

		/**
		 * @param username
		 * @returns {UserRepository}
		 */
		that.setUsername = function (username) {
			that.user.username = username;

			return that;
		};

		/**
		 * @returns {String}
		 */
		that.getUsername = function () {
			return that.user.username;
		};

		/**
		 * @param accessToken
		 * @returns {UserRepository}
		 */
		that.setAccessToken = function (accessToken) {
			that.user.accessToken = accessToken;

			return that;
		};

		/**
		 * @returns {String}
		 */
		that.getAccessToken = function () {
			return that.user.accessToken;
		};

		/**
		 * @param refreshToken
		 * @returns {UserRepository}
		 */
		that.setRefreshToken = function (refreshToken) {
			that.user.refreshToken = refreshToken;

			return that;
		};

		/**
		 * @returns {String}
		 */
		that.getRefreshToken = function () {
			return that.user.refreshToken;
		};

		/**
		 * @param clientSecret
		 * @returns {UserRepository}
		 */
		that.setClientSecret = function (clientSecret) {
			that.user.clientSecret = clientSecret;

			return that;
		};

		/**
		 * @returns {String}
		 */
		that.getClientSecret = function () {
			return that.user.clientSecret;
		};

		/**
		 * @param accessTokenExpiresAt
		 * @returns {UserRepository}
		 */
		that.setAccessTokenExpiresAt = function (accessTokenExpiresAt) {
			that.user.accessTokenExpiresAt = accessTokenExpiresAt;

			return that;
		};

		/**
		 * @returns {int}
		 */
		that.getAccessTokenExpiresAt = function () {
			return that.user.accessTokenExpiresAt;
		};

		/**
		 * @param refreshTokenExpiresAt
		 * @returns {UserRepository}
		 */
		that.setRefreshTokenExpiresAt = function (refreshTokenExpiresAt) {
			that.user.refreshTokenExpiresAt = refreshTokenExpiresAt;

			return that;
		};

		/**
		 * @returns {int}
		 */
		that.getRefreshTokenExpiresAt = function () {
			return that.user.refreshTokenExpiresAt;
		};

		/**
		 * @param email
		 * @returns {UserRepository}
		 */
		that.setEmail = function (email) {
			that.user.email = email;

			return that;
		};

		/**
		 * @returns {String}
		 */
		that.getEmail = function () {
			return that.user.email;
		};

		/**
		 * @param clientId
		 * @returns {UserRepository}
		 */
		that.setClientId = function (clientId) {
			that.user.clientId = clientId;

			return that;
		};

		/**
		 * @returns {String}
		 */
		that.getClientId = function () {
			return that.user.clientId;
		};

		/**
		 * @param isAuthenticated
		 * @returns {UserRepository}
		 */
		that.setIsAuthenticated = function (isAuthenticated) {
			that.user.isAuthenticated = isAuthenticated;

			return that;
		};

		/**
		 * @returns {Boolean}
		 */
		that.isAuthenticated = function () {
			if (that.user.hasOwnProperty('isAuthenticated')) {
				return that.user.isAuthenticated;
			}
			return false;
		};
	}


	angular.module('eventManagementApp')
		.service('UserRepository', UserRepository);

})(angular);