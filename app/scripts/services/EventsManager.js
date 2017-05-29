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
		 * @param page
		 * @param parameters
		 * @returns {*}
		 */
		that.getCollection = function (page, parameters) {
			return DataFetcher.GETData('/events', page.page, parameters);
		};

		/**
		 * @param eventId
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
				}, function (errors) {
					errorHandler(errors);
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
				}, function (errors) {
					errorHandler(errors);
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
				}, function (errors) {
					errorHandler(errors);
				});
		};

		/**
		 * @param event
		 */
		that.edit = function (event) {
			DataFetcher.PUTData('/event', event)
				.then(function () {
						Growl.success("Twoje wydarzenie zostało pomyślnie edytowane.", {ttl: 2500});
						return event;
					},
					function (errors) {
						errorHandler(errors);
					});
		};

		/**
		 * @param event
		 */
		that.create = function (event) {
			DataFetcher.Create('/event', event)
				.then(function () {
						Growl.success("Twoje wydarzenie zostało pomyślnie utworzone.", {ttl: 2500});
						return event;
					},
					function (errors) {
						errorHandler(errors);
					});
		};

		/**
		 * @param errors
		 */
		function errorHandler(errors) {
			if (!errors.data.message) {
				for (var property in errors.data) {
					if (errors.data.hasOwnProperty(property)) {
						errors.data[property].forEach(function (error) {
							Growl.error(property + ": " + error, {ttl: 2500});
						});
						break;
					}
				}
			}
			else {
				Growl.error(errors.data.message, {ttl: 2500});
			}
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