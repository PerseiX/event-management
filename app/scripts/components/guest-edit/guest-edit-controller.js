(function (angular) {
	'use strict';

	/**
	 * @param GuestsRepository
	 * @param TagsRepository
	 * @param GuestsManager
	 * @param $stateParams
	 * @constructor
	 */
	function GuestController(GuestsRepository, TagsRepository, GuestsManager, $stateParams) {
		let vm = this;
		vm.tags = TagsRepository.getTags();
		vm.guest = GuestsRepository.getGuest($stateParams.guestId);

		vm.editGuest = function () {
			let chosenTags = [];
			angular.forEach(vm.guest.tag, function (value, key) {
				if (true === value) {
					chosenTags.push(key);
				}
			});
			vm.guest.tag = chosenTags;
			GuestsManager.edit(Object.assign(vm.guest, {'event': $stateParams.eventId}));
		}
	}

	angular
		.module('eventManagementApp')
		.controller('GuestController', GuestController);

	GuestController.$inject = [
		'GuestsRepository',
		'TagsRepository',
		'GuestsManager',
		'$stateParams'
	];

})(angular);