(function (angular) {
	'use strict';

	/**
	 * @param Event
	 * @param EventsManager
	 * @constructor
	 */
	function EventController(Event, EventsManager) {
		var vm = this;

		vm.event = Event;

		vm.editEvent = function () {
			EventsManager.edit(vm.event);
		}
	}

	angular
		.module('eventManagementApp')
		.controller('EventController', EventController);

	EventController.$inject = [
		'Event',
		'EventsManager'
	];

})(angular);