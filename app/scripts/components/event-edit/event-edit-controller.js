(function (angular) {
	'use strict';

	/**
	 * @param SingleEventRepository
	 * @param EventsManager
	 * @constructor
	 */
	function EventController(SingleEventRepository, EventsManager) {
		var vm = this;

		vm.event = SingleEventRepository.getEvent();

		vm.editEvent = function () {
			EventsManager.edit(vm.event);
		}

	}

	angular
		.module('eventManagementApp')
		.controller('EventController', EventController);

	EventController.$inject = [
		'SingleEventRepository',
		'EventsManager'
	];

})(angular);