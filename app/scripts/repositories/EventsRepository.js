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

			return that;
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
			return that.events.find(function (event) {
				if (event.id == eventId) {
					return event;
				}
			});
		};

		/**
		 * @param pages
		 * @returns {EventsRepository}
		 */
		that.setPages = function (pages) {
			that.pages = pages;

			return that;
		};

		/**
		 * @returns {*}
		 */
		that.getPages = function () {
			return that.pages;
		}
	}

	angular
		.module('eventManagementApp')
		.service('EventsRepository', EventsRepository);

})(angular);