(function (angular) {
	'use strict';

	/**
	 * @param LocalStorageManager
	 * @param $q
	 * @param UserRepository
	 * @returns {UserAuthentication}
	 * @constructor
	 */
	function UserAuthentication(LocalStorageManager, $q, UserRepository) {
		let that = this;

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
		 * @returns {IPromise}
		 */
		that.authenticate = function (provider) {
			let deferred = $q.defer();
			let user = LocalStorageManager.getUser();

			if (null == user) {
				that.auth.authenticate(provider)
					.then(function (response) {
						LocalStorageManager.saveUser(response.data);
						deferred.resolve(angular.fromJson(response.data))
					});
			}
			else {
				deferred.resolve(user)
			}

			return deferred.promise;
		};

		/**
		 * @returns {boolean}
		 */
		that.logout = function () {
			LocalStorageManager.remove('user');
			UserRepository.user = {};

			return true;
		};

		return that;
	}

	angular
		.module('eventManagementApp')
		.service('UserAuthentication', UserAuthentication);

	UserAuthentication.$inject = [
		'LocalStorageManager',
		'$q',
		'UserRepository'
	];
})(angular);
