(function (angular) {
	'use strict';

	/**
	 * @param UserAuthProvider
	 * @constructor
	 */
	function MainController(UserAuthProvider) {
		var vm = this;
		vm.isAuthenticated = UserAuthProvider.isAuthenticated();

		vm.authenticate = function (provider) {
			UserAuthProvider.authenticate(provider).then(function () {
				vm.isAuthenticated = UserAuthProvider.isAuthenticated();
			});
		};

		vm.logout = function () {
			UserAuthProvider.logout();
			vm.isAuthenticated = UserAuthProvider.isAuthenticated();
		};
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