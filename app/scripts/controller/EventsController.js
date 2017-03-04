(function (angular) {
	'use strict';

	/**
	 * @param Events
	 * @constructor
	 */
	function EventsController(Events) {
		var vm = this;

		vm.events = Events.collection;
	}

	angular
		.module('eventManagementApp')
		.controller('EventsController', EventsController);

	EventsController.$inject = [
		'Events'
	];

})(angular);