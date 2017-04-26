(function (angular) {
	'use strict';

	function GuestsRepository() {
		var that = this;

		that.guests = null;

		/**
		 * @param guests
		 */
		that.setGuests = function (guests) {
			that.guests = guests;
		};

		/**
		 * @returns {EventsRepository}
		 */
		that.getGuests = function () {
			return that.guests;
		};

		/**
		 * @param guestId
		 */
		that.getEvent = function (guestId) {
			that.guests.find(function (guest) {
				if (guest.id == guestId) {
					return guestId;
				}
			});
		}
	}

	angular.module('eventManagementApp')
		.service('GuestsRepository', GuestsRepository);
})(angular);
