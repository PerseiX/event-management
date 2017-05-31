(function (angular) {
	'use strict';

	/**
	 * @param $stateParams
	 * @param EventsManager
	 * @constructor
	 */
	function EventController($stateParams, EventsManager) {
		let vm = this;

		EventsManager.getSingleResult($stateParams.eventId).then(function (response) {
			vm.event = response;
		});

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