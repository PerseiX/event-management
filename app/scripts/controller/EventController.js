(function (angular) {
	'use strict';

	/**
	 * @param Event
	 * @param DataFetcher
	 * @constructor
	 */
	function EventController(Event, DataFetcher) {
		var vm = this;

		vm.event = Event;

		vm.editEvent = function () {
			DataFetcher.PUTData('/event', vm.event);
		}
	}

	angular
		.module('eventManagementApp')
		.controller('EventController', EventController);

	EventController.$inject = [
		'Event',
		'DataFetcher'
	];

})(angular);