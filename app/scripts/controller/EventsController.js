(function (angular) {
	'use strict';

	/**
	 *
	 * @param Events
	 * @param EventsManager
	 * @param EventsRepository
	 * @constructor
	 */
	function EventsController(Events, EventsManager, EventsRepository) {
		var vm = this;

		EventsRepository.setEvents(Events.collection);

		vm.events = Events.collection;

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
		'Events',
		'EventsManager',
		'EventsRepository'
	];

})(angular);