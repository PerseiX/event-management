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

		$scope.manager = EventsManager;
		vm.total = EventsManager.getCollection().pages * CONST.PAGINATION_ELEMENT_PER_PAGE;

		vm.switchPage = function (page) {
			EventsManager.getCollection(true, page.page).then(function (response) {
				vm.page = response.page;
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
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