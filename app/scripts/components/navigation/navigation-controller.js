(function (angular) {
	'use strict';

	function NavigationController(UserAuthProvider) {
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

	angular.module('eventManagementApp')
		.controller('NavigationController', NavigationController);

	NavigationController.$inject = [
		'UserAuthProvider'
	];
})(angular);