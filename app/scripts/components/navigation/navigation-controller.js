(function (angular) {
	'use strict';

	function NavigationController(UserManager, $scope) {
		var vm = this;

		$scope.manager = UserManager;

		vm.login = function (provider) {
			UserManager.login(provider);
		};

		vm.logout = function () {
			UserManager.logout();
		};
	}

	angular.module('eventManagementApp')
		.controller('NavigationController', NavigationController);

	NavigationController.$inject = [
		'UserManager',
		'$scope'
	];
})(angular);