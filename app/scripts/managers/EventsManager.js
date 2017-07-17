(function (angular) {
	'use strict';

	/**
	 * @param Growl
	 * @param DataFetcher
	 * @constructor
	 */
	function EventsManager(Growl, DataFetcher) {
		let that = this;

		/**
		 * @param page
		 * @param force
		 * @returns {*}
		 */
		that.getCollection = function (force = false, page = 1) {
			let parameters = [];
			parameters['page'] = page;

			return DataFetcher.GETData('/events', force, parameters);
		};
//TODO Get single result centralised in fetcher
		/**
		 * @param eventId
		 */
		that.getSingleResult = function (eventId) {
			return that.getCollection().then(function (response) {
				return response.collection.find(function (event) {
					if (event.id === eventId) {
						return event;
					}
				})
			});
		};

		/**
		 *
		 * @param eventId
		 * @param page
		 * @returns {*}
		 */
		that.enable = function (eventId, page) {
			return DataFetcher.PUTEnable('/event/enable', eventId)
				.then(function () {
					Growl.success("Twoje wydarzenie zostało włączone.", {ttl: 2500});

					return event;
				}, function (errors) {
					errorHandler(errors);
				}).then(function () {
					return that.getCollection(true, page);
				});
		};

		/**
		 * @param eventId
		 * @param page
		 * @returns {*}
		 */
		that.disable = function (eventId, page) {
			return DataFetcher.PUTDisable('/event/disable', eventId)
				.then(function () {
					that.getCollection(true, page);
					Growl.success("Twoje wydarzenie zostało wyłączone.", {ttl: 2500});

					return event;
				}, function (errors) {
					errorHandler(errors);
				}).then(function () {
					return that.getCollection(true, page);
				});
		}
		;

		/**
		 * @param eventId
		 * @param page
		 * @returns {IPromise<*>}
		 */
		that.delete = function (eventId, page) {
			return DataFetcher.Delete('/event', eventId)
				.then(function () {
					Growl.error("Twoje wydarzenie zostało usunięte.", {ttl: 2500});

					return event;
				}, function (errors) {
					errorHandler(errors);
				}).then(function () {
					return that.getCollection(true, page);
				});
		};

		/**
		 * @param event
		 * @returns {*}
		 */
		that.edit = function (event) {
			return DataFetcher.PUTData('/event', event)
				.then(function () {
						Growl.success("Twoje wydarzenie zostało pomyślnie edytowane.", {ttl: 2500});
						return event;
					},
					function (errors) {
						errorHandler(errors);
					});
		};

		/**
		 *
		 * @param event
		 * @returns {*}
		 */
		that.create = function (event) {
			console.log(event);
			return DataFetcher.Create('/event', event)
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
				for (let property in errors.data) {
					console.log(errors);
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
		'DataFetcher'
	];
})
(angular);