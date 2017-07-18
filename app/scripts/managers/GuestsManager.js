(function (angular) {
	'use strict';

	/**
	 * @param DataFetcher
	 * @param Growl
	 * @constructor
	 */
	function GuestsManager(DataFetcher, Growl) {
		let that = this;

		/**
		 *
		 * @param force
		 * @param eventId
		 * @param page
		 * @returns {*}
		 */
		that.getCollection = function (force = false, eventId, page) {
			let parameters = [];

			parameters['page'] = page;
			parameters['embedded'] = 'guest.tag';
			parameters['limit'] = '8';

			return DataFetcher.GETData('/event/' + eventId + '/guests', force, parameters);
		};

		//TODO use Hateos _link response
		/**
		 *
		 * @param guestId
		 * @param evenId
		 * @returns {*}
		 */
		that.getSingleResult = function (guestId, evenId) {
			return that.getCollection(true, evenId).then(function (response) {
				return response.collection.find(function (guest) {
					if (parseInt(guest.id, 10) === parseInt(guestId, 10)) {
						return guest;
					}
				})
			});
		};

		/**
		 * @param guestId
		 * @param eventId
		 * @param page
		 * @constructor
		 */
		that.delete = function (guestId, eventId, page) {
			return DataFetcher.Delete('/guest', guestId)
				.then(function (response) {
						Growl.error("Twój gość został pomyślnie usunięty.", {ttl: 2500});

						return response;
					},
					function (errors) {
						errorHandler(errors);
					}
				).then(function () {
					return that.getCollection(true, eventId, page);
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
					return that.getCollection(1, guest.event);
				});
		};

		/**
		 *
		 * @param guest
		 * @returns {IPromise<>}
		 */
		that.create = function (guest) {
			return DataFetcher.Create('/guest', guest)
				.then(function (response) {
						Growl.success("Twoje gość został pomyślnie utworzony.", {ttl: 2500});
						return response;
					},
					function (errors) {
						errorHandler(errors);
					})
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

		return that;
	}

	angular
		.module('eventManagementApp')
		.service('GuestsManager', GuestsManager);

	GuestsManager.$inject = [
		'DataFetcher',
		'growl'
	];
})
(angular);