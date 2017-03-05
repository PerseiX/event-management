(function (angular) {
	'use strict';

	/**
	 *
	 * @param MessageManager
	 * @param EventsRepository
	 * @param DataFetcher
	 * @constructor
	 */
	function EventsManager(MessageManager, EventsRepository, DataFetcher) {
		var that = this;

		/**
		 * @param eventId`
		 */
		that.enable = function (eventId) {
			DataFetcher.PUTEnable('/event/enable', eventId)
				.then(function () {
					EventsRepository.getEvents().find(function (event) {
						if (event.id == eventId) {
							event.active = true;
							MessageManager.alertSuccess("Twoje wydarzenie zostało włączone.");

							return event;
						}
					});
				});
		};

		/**
		 * @param eventId
		 */
		that.disable = function (eventId) {
			DataFetcher.PUTDisable('/event/disable', eventId)
				.then(function () {
					EventsRepository.getEvents().find(function (event) {
						if (event.id == eventId) {
							event.active = false;
							MessageManager.alertSuccess("Twoje wydarzenie zostało wyłączone.");

							return event;
						}
					});
				});
		};

		/**
		 * @param eventId
		 */
		that.delete = function (eventId) {
			DataFetcher.Delete('/event', eventId)
				.then(function () {
					EventsRepository.getEvents().find(function (event, id) {
						if (event.id == eventId) {
							EventsRepository.getEvents().splice(id, 1);
							MessageManager.alertDanger("Twoje wydarzenie zostało usunięte.");

							return event;
						}
					});
				});
		}
	}

	angular
		.module('eventManagementApp')
		.service('EventsManager', EventsManager);

	EventsManager.$inject = [
		'MessageManager',
		'EventsRepository',
		'DataFetcher'
	];
})(angular);