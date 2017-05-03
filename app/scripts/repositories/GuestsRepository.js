(function (angular) {
	'use strict';

	function GuestsRepository() {
		var that = this;

		that.guests = null;

		/**
		 * @param guests
		 * @returns {GuestsRepository}
		 */
		that.setGuests = function (guests) {
			that.guests = guests;
			return that;
		};

		/**
		 * @returns {GuestsRepository|null}
		 */
		that.getGuests = function () {
			return that.guests;
		};

		/**
		 * @param guestId
		 */
		that.getGuest = function (guestId) {
			return that.guests.find(function (guest) {
				if (guest.id == guestId) {
					return guest;
				}
			});
		};

		/**
		 * @param pages
		 * @returns {GuestsRepository}
		 */
		that.setPages = function (pages) {
			that.pages = pages;

			return that;
		};

		/**
		 * @returns {int}
		 */
		that.getPages = function () {
			return that.pages;
		}
	}

	angular.module('eventManagementApp')
		.service('GuestsRepository', GuestsRepository);
})(angular);
