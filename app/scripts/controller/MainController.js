(function (angular) {
	'use strict';

	/**
	 *
	 * @param UserAuthProvider
	 * @param $auth
	 * @constructor
	 */
	function MainController(UserAuthProvider, $auth) {
		var vm = this;

		vm.authenticate = function (provider) {
			UserAuthProvider.setAuth($auth);
			UserAuthProvider.authenticate(provider);
			vm.isAuthenticated = UserAuthProvider.isAuthenticated();
		};

		vm.logout = function () {
			UserAuthProvider.logout();
			vm.isAuthenticated = UserAuthProvider.isAuthenticated();
		};

		vm.isAuthenticated = UserAuthProvider.isAuthenticated();
	}

	angular
		.module('eventManagementApp')
		.controller('MainController', MainController);

	MainController.$inject = [
		'UserAuthProvider',
		'$auth'
	];
})
(angular);