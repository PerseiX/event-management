(function (angular) {
	'use strict';

	/**
	 * @param EventsManager
	 * @param CONST
	 * @param $scope
	 * @constructor
	 */
	function EventsController(EventsManager, CONST, $scope) {
		let vm = this;

		vm.elementPerPage = CONST.PAGINATION_ELEMENT_PER_PAGE;

		EventsManager.getCollection(true).then(function (response) {
			vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
			$scope.response = response;
		});

		$scope.enable = function (eventId, page) {
			EventsManager.enable(eventId, page).then(function (response) {
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
				$scope.response = response;
			});
		};
		$scope.disable = function (eventId, page) {
			EventsManager.disable(eventId, page).then(function (response) {
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
				$scope.response = response;
			});
		};

		$scope.delete = function (eventId, page) {
			EventsManager.delete(eventId, page).then(function (response) {
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
				$scope.response = response;
			});
		};

		vm.switchPage = function (page) {
			EventsManager.getCollection(false, page.page).then(function (response) {
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
				$scope.response = response;
			});
		};

		vm.sorting = function () {
			EventsManager.getCollection().then(function (response) {
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
				$scope.response = response;
			});
		};
	}

	angular
		.module('eventManagementApp')
		.controller('EventsController', EventsController);

	EventsController.$inject = [
		'EventsManager',
		'CONST',
		'$scope'
	];

})(angular);