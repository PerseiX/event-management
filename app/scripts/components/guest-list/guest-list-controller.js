(function (angular) {
	'use strict';

	/**
	 * @param GuestsRepository
	 * @param GuestsManager
	 * @param CONST
	 * @param $stateParams
	 * @param $scope
	 * @constructor
	 */
	function GuestListController(GuestsRepository, GuestsManager, CONST, $stateParams, $scope) {
		var vm = this;

		var eventId = $stateParams.eventId;
		$scope.guestsRepository = GuestsRepository;
		
		vm.total = GuestsRepository.getPages() * CONST.PAGINATION_ELEMENT_PER_PAGE;
		vm.page = 1;

		vm.switchPage = function (page) {
			GuestsManager.getCollection(page, eventId)
				.then(function (collection) {
					GuestsRepository.setGuests(collection.collection);
				}).then(function () {
				$scope.guestsRepository = GuestsRepository;
			});
			vm.page = page.page;
			vm.total = GuestsRepository.getPages() * CONST.PAGINATION_ELEMENT_PER_PAGE;
		};

		vm.delete = function (guestId) {
			GuestsManager.Delete(guestId);
		}
	}

	angular
		.module('eventManagementApp')
		.controller('GuestListController', GuestListController);

	GuestListController.$inject = [
		'GuestsRepository',
		'GuestsManager',
		'CONST',
		'$stateParams',
		'$scope'
	];

})(angular);