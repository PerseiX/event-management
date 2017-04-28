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
		vm.page = 1;
		vm.total = EventsRepository.getPages() * 10 + 1;

		vm.switchPage = function (page) {
			EventsManager.getCollection(page).then(function (collection) {
				vm.events = collection.collection;
			});
			vm.page = page.page;
			vm.total = EventsRepository.getPages() * 10 + 1;

		};

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