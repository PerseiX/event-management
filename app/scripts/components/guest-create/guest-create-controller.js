(function (angular) {
	'use strict';

	/**
	 * @param GuestsManager
	 * @param TagsRepository
	 * @param $stateParams
	 * @constructor
	 */
	function GuestCreateController(GuestsManager, TagsRepository, $stateParams) {
		var vm = this;
		vm.tags = TagsRepository.getTags();
		var eventId = $stateParams.eventId;

		vm.createGuest = function () {
			// GuestsManager.create(vm.guest);
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