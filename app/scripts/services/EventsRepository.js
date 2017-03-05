(function (angular) {
	'use strict';

	function EventsRepository() {
		var that = this;

		that.events = null;

		/**
		 * @param events
		 */
		that.setEvents = function (events) {
			that.events = events;
		};

		/**
		 * @returns {EventsRepository}
		 */
		that.getEvents = function () {
			return that.events;
		};

		/**
		 * @param eventId
		 * @returns {EventsRepository}
		 */
		that.getEvent = function (eventId) {
			that.events.find(function (event) {
				if (event.id == eventId) {
					return eventId;
				}
			});
		}
	}

	angular
		.module('eventManagementApp')
		.service('EventsRepository', EventsRepository);

})(angular);