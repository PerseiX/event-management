(function (angular) {
	'use strict';

	/**
	 * @param EventsRepository
	 * @param $stateParams
	 * @param EventsManager
	 * @constructor
	 */
	function EventController(EventsRepository, $stateParams, EventsManager) {
		var vm = this;

		vm.eventRepository = EventsRepository;
		vm.eventId = $stateParams.eventId;

		vm.editEvent = function () {
			EventsManager.edit(vm.eventRepository.getEvent(vm.eventId));
		}
	}

	angular
		.module('eventManagementApp')
		.controller('EventController', EventController);

	EventController.$inject = [
		'EventsRepository',
		'$stateParams',
		'EventsManager'
	];

})(angular);