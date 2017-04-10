(function (angular) {
	'use strict';

	/**
	 * @param localStorageService
	 * @constructor
	 */
	function LocalStorageManager(localStorageService) {
		var that = this;

		/**
		 * @param element
		 */
		that.remove = function (element) {
			localStorageService.remove(element);
		};

		/**
		 * @param user
		 * @returns {*}
		 */
		that.saveUser = function (user) {
			localStorageService.set('user', angular.fromJson(user));

			return user;
		};

		that.getUser = function()
		{
			return localStorageService.get('user');
		}
	}

	angular.module('eventManagementApp')
		.service('LocalStorageManager', LocalStorageManager);

	LocalStorageManager.$inject = [
		'localStorageService'
	];
})(angular);