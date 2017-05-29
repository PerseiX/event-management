(function (angular) {
	'use strict';

	/**
	 * @param EventsManager
	 * @param EventsRepository
	 * @param CONST
	 * @constructor
	 */
	function EventsController(EventsManager, EventsRepository, CONST) {
		var vm = this;
		//TODO INTEGRATE REPOSITORIES TOGETHER WITH FETCHER AND COLLECT ONE REPOSITORY
		vm.events = EventsRepository.getEvents();
		vm.page = 1;
		vm.total = EventsRepository.getPages() * CONST.PAGINATION_ELEMENT_PER_PAGE;

		vm.switchPage = function (page) {
			EventsManager.getCollection(page, []).then(function (collection) {
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

		vm.sortBy = function (field, orderType) {
			vm.orderType = orderType;
			var orderBy = [];
			var param = [];
			param[field] = orderType;
			orderBy['sortBy'] = param;

			EventsManager.getCollection(vm.page, orderBy).then(function (collection) {
				vm.events = collection.collection;
				EventsRepository.setEvents(collection.collection);
			});
			vm.orderType = (vm.orderType === 'ASC') ? 'DESC' : 'ASC';
		};
	}

	angular
		.module('eventManagementApp')
		.controller('EventsController', EventsController);

	EventsController.$inject = [
		'EventsManager',
		'EventsRepository',
		'CONST'
	];

})(angular);