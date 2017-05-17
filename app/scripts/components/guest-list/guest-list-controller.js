(function (angular) {
	'use strict';
	/**
	 * @param GuestsRepository
	 * @param GuestsManager
	 * @param CONST
	 * @param $stateParams
	 * @constructor
	 */
	function GuestListController(GuestsRepository, GuestsManager, CONST, $stateParams) {
		var vm = this;

		var eventId = $stateParams.eventId;
		vm.guests = GuestsRepository.getGuests();
		vm.total = GuestsRepository.getPages() * CONST.PAGINATION_ELEMENT_PER_PAGE;
		vm.page = 1;
		console.log(vm.guests);
		vm.switchPage = function (page) {
			GuestsManager.getCollection(page, eventId).then(function (collection) {
				vm.guests = collection.collection;
				GuestsRepository.setGuests(collection.collection);
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
		'$stateParams'
	];

})(angular);