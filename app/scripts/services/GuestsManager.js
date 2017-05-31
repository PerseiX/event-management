(function (angular) {
	'use strict';

	/**
	 * @param DataFetcher
	 * @param GuestsRepository
	 * @param Growl
	 * @constructor
	 */
	function GuestsManager(DataFetcher, GuestsRepository, Growl) {
		let that = this;

		/**
		 * @param page
		 * @param id
		 * @returns {IPromise}
		 */
		that.getCollection = function (page, id) {
			let parameters = [];
			parameters['embedded'] = 'guest.tag';
			return DataFetcher.GETData('/event/' + id + '/guests', page.page, parameters);
		};

		/**
		 *
		 * @param guestId {int}
		 * @returns {IPromise}
		 * @constructor
		 */
		that.Delete = function (guestId) {
			DataFetcher.Delete('/guest', guestId)
				.then(function () {
						GuestsRepository.getGuests().find(function (guest, id) {
							if (guest.id == guestId) {
								GuestsRepository.getGuests().splice(id, 1);
								Growl.error("Twój gość został pomyślnie usunięty.", {ttl: 2500});

								return guest;
							}
						})
					},
					function (errors) {
						errorHandler(errors);
					});
		};

		/**
		 * @param guest
		 */
		that.edit = function (guest) {
			DataFetcher.PUTData('/guest', guest)
				.then(function () {
						Growl.success("Twój gość został pomyślnie edytowany.", {ttl: 2500});
						return event;
					},
					function (errors) {
						errorHandler(errors);
					})
				.then(function () {
					return that.getCollection(1, guest.event)
						.then(function (guests) {
							GuestsRepository.setGuests(guests.collection);
						});
				});
		};

		/**
		 *
		 * @param guest
		 * @returns {IPromise<>}
		 */
		that.create = function (guest) {
			return DataFetcher.Create('/guest', guest)
				.then(function () {
						Growl.success("Twoje gość został pomyślnie utworzony.", {ttl: 2500});

						return guest;
					},
					function (errors) {
						errorHandler(errors);
					})
				.then(function () {
					return that.getCollection(1, guest.event)
						.then(function (guests) {
							GuestsRepository.setGuests(guests.collection);
						});
				});
		};

		/**
		 * @param errors
		 */
		function errorHandler(errors) {
			for (let property in errors.data) {
				if (errors.data.hasOwnProperty(property)) {
					Growl.error(errors.data.message, {ttl: 2500});
				}
			}
		}
	}

	angular
		.module('eventManagementApp')
		.service('GuestsManager', GuestsManager);

	GuestsManager.$inject = [
		'DataFetcher',
		'GuestsRepository',
		'growl'
	];
})(angular);