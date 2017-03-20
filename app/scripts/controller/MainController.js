(function (angular) {
	'use strict';

	/**
	 * @param $auth
	 * @param localStorageService
	 * @constructor
	 */
	function MainController($auth, localStorageService) {
		var vm = this;

		vm.authenticate = function (provider) {
			$auth.authenticate(provider)
				.then(function (response) {
					var authenticateResponse = angular.fromJson(response.data);
					localStorageService.set('user', authenticateResponse);
				})
				.catch(function (error) {
					console.log(error);
				});

		};
	}

	angular
		.module('eventManagementApp')
		.controller('MainController', MainController);

	MainController.$inject = [
		'$auth',
		'localStorageService'
	];
})
(angular);