(function (angular) {
	'use strict';

	/**
	 * @param $stateParams
	 * @param EventsManager
	 * @constructor
	 */
	function EventController($stateParams, EventsManager) {
		let vm = this;

		vm.event = EventsManager.getSingleResult($stateParams.eventId);
		vm.manager = EventsManager;
	}

	angular
		.module('eventManagementApp')
		.controller('EventController', EventController);

	EventController.$inject = [
		'$stateParams',
		'EventsManager'
	];

})(angular);