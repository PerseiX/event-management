(function (angular) {
	'use strict';

	/**
	 * @param EventsManager
	 * @param EventsRepository
	 * @param CONST
	 * @param sorting
	 * @constructor
	 */
	function EventsController(EventsManager, EventsRepository, CONST, sorting) {
		var vm = this;

		//TODO INTEGRATE REPOSITORIES TOGETHER WITH FETCHER AND COLLECT ONE REPOSITORY
		vm.events = EventsRepository.getEvents();
		vm.page = 1;
		vm.total = EventsRepository.getPages() * CONST.PAGINATION_ELEMENT_PER_PAGE;

		vm.switchPage = function (page) {
			EventsManager.getCollection(page, sorting.getPreparedSortArgument()).then(function (collection) {
				vm.events = collection.collection;
				EventsRepository.setEvents(collection.collection);
			});
			vm.page = page.page;
			vm.total = EventsRepository.getPages() * CONST.PAGINATION_ELEMENT_PER_PAGE;
		};

		vm.enable = function (eventId) {
			EventsManager.enable(eventId);
		};

		vm.disable = function (eventId) {
			EventsManager.disable(eventId);
		};

		vm.delete = function (eventId) {
			EventsManager.delete(eventId);
		};

		vm.sort = function () {
			vm.page = 1;
			EventsManager.getCollection(vm.page, sorting.getPreparedSortArgument())
				.then(function (collection) {
					vm.events = collection.collection;
					EventsRepository.setEvents(collection.collection);
				});
		}
	}

	angular
		.module('eventManagementApp')
		.controller('EventsController', EventsController);

	EventsController.$inject = [
		'EventsManager',
		'EventsRepository',
		'CONST',
		'sorting'
	];

})(angular);