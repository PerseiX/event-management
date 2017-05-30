(function (angular) {
	'use strict';

	/**
	 * @param EventsManager
	 * @constructor
	 */
	function EventCreateController(EventsManager) {
		let vm = this;
		vm.manager = EventsManager;
	}

	angular
		.module('eventManagementApp')
		.controller('EventCreateController', EventCreateController);

	EventCreateController.$inject = [
		'EventsManager'
	];

})(angular);