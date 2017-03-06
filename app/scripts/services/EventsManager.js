(function (angular) {
	'use strict';

	/**
	 * @param Growl
	 * @param EventsRepository
	 * @param DataFetcher
	 * @constructor
	 */
	function EventsManager(Growl, EventsRepository, DataFetcher) {
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
							Growl.success("Twoje wydarzenie zostało włączone.", {ttl: 2500});

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
							Growl.success("Twoje wydarzenie zostało wyłączone.", {ttl: 2500});

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
							Growl.error("Twoje wydarzenie zostało usunięte.", {ttl: 2500});

							return event;
						}
					});
				});
		};

		/**
		 * @param event
		 */
		that.edit = function (event) {
			DataFetcher.PUTData('/event', event)
				.then(function () {
					growl.success("Twoje wydarzenie zostało pomyślnie edytowane.", {ttl: 2500});

					return event;
				})
		}
	}

	angular
		.module('eventManagementApp')
		.service('EventsManager', EventsManager);

	EventsManager.$inject = [
		'growl',
		'EventsRepository',
		'DataFetcher'
	];
})(angular);