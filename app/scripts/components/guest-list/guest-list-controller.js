(function (angular) {
	'use strict';

	/**
	 * @param GuestsManager
	 * @param $stateParams
	 * @param $scope
	 * @constructor
	 */
	function GuestListController(GuestsManager, $stateParams, $scope) {
		let vm = this;
		let eventId = $stateParams.eventId;

		vm.elementPerPage = 8;

		GuestsManager.getCollection(true, eventId, 1).then(function (response) {
			vm.total = response.pages * vm.elementPerPage;
			$scope.response = response;
		});

		vm.switchPage = function (page) {
			GuestsManager.getCollection(false, eventId, page.page).then(function (response) {
				vm.total = response.pages * vm.elementPerPage;
				$scope.response = response;
			});
		};

		vm.sorting = function () {
			GuestsManager.getCollection(true, eventId).then(function (response) {
				vm.total = response.pages * vm.elementPerPage;
				$scope.response = response;
			});
		};

		$scope.delete = function (guestId, page) {
			GuestsManager.delete(guestId, eventId, page).then(function (response) {
				vm.total = response.pages * vm.elementPerPage;
				$scope.response = response;
			});
		};
	}

	angular
		.module('eventManagementApp')
		.controller('GuestListController', GuestListController);

	GuestListController.$inject = [
		'GuestsManager',
		'$stateParams',
		'$scope'
	];

})(angular);