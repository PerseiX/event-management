(function (angular) {
	'use strict';

	/**
	 * @param GuestsManager
	 * @param TagsRepository
	 * @param $stateParams
	 * @constructor
	 */
	function GuestCreateController(GuestsManager, TagsRepository, $stateParams) {
		let vm = this;
		vm.tags = TagsRepository.getTags();
		let eventId = $stateParams.eventId;
		let chosenTags = [];

		vm.createGuest = function () {
			angular.forEach(vm.guest.tag, function (value, key) {
				if (true === value) {
					chosenTags.push(key);
				}
			});
			vm.guest.tag = chosenTags;
			GuestsManager.create(Object.assign(vm.guest, {'event': eventId}));
		}
	}

	angular
		.module('eventManagementApp')
		.controller('GuestCreateController', GuestCreateController);

	GuestCreateController.$inject = [
		'GuestsManager',
		'TagsRepository',
		'$stateParams'
	];

})(angular);