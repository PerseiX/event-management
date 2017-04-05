(function (angular) {
	'use strict';

	/**
	 * @param EventsManager
	 * @param EventsRepository
	 * @constructor
	 */
	function EventsController(EventsManager, EventsRepository) {
		var vm = this;

		vm.events = EventsRepository.getEvents();

		vm.enable = function (eventId) {
			EventsManager.enable(eventId);
		};

		vm.disable = function (eventId) {
			EventsManager.disable(eventId);
		};

		vm.delete = function (eventId) {
			EventsManager.delete(eventId);
		}
	}

	angular
		.module('eventManagementApp')
		.controller('EventsController', EventsController);

	EventsController.$inject = [
		'EventsManager',
		'EventsRepository'
	];

})(angular);