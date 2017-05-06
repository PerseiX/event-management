(function (angular) {
	'use strict';

	/**
	 * @param EventsManager
	 * @constructor
	 */
	function EventCreateController(EventsManager) {
		var vm = this;

		vm.createEvent = function (event) {
			EventsManager.create(event);
		}
	}

	angular
		.module('eventManagementApp')
		.controller('EventCreateController', EventCreateController);

	EventCreateController.$inject = [
		'EventsManager'
	];

})(angular);