(function (angular) {
	'use strict';

	/**
	 * @param GuestsRepository
	 * @param GuestsManager
	 * @param $stateParams
	 * @constructor
	 */
	function GuestController(GuestsRepository, GuestsManager, $stateParams) {
		var vm = this;

		vm.guestRepository = GuestsRepository;
		vm.guestId = $stateParams.guestId;

		vm.editGuest = function () {
			GuestsManager.edit(GuestsRepository.getGuest(vm.guestId));
		}

	}

	angular
		.module('eventManagementApp')
		.controller('GuestController', GuestController);

	GuestController.$inject = [
		'GuestsRepository',
		'GuestsManager',
		'$stateParams'
	];

})(angular);