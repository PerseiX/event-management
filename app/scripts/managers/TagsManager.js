(function (angular) {
	'use strict';

	/**
	 * @param DataFetcher
	 * @param Growl
	 * @constructor
	 */
	function TagsManager(DataFetcher, Growl) {
		let that = this;

		/**
		 * @param force
		 * @param page
		 * @param eventId
		 * @returns {*}
		 */
		that.getCollection = function (force = false, eventId, page) {

			let parameters = [];
			parameters['page'] = page;

			return DataFetcher.GETData('/event/' + eventId + '/tags', force, parameters);
		};

		/**
		 * @param tagId
		 * @param evenId
		 */
		that.getSingleResult = function (tagId, evenId) {
			return that.getCollection(false, evenId).then(function (response) {
				return response.collection.find(function (tag) {
					if (tag.id == tagId) {
						return tag;
					}
				})
			});
		};

		/**
		 * @param tag
		 * @returns {IPromise}
		 */
		that.tagCreate = function (tag) {
			return DataFetcher.Create('/tag', tag)
				.then(function (response) {
						Growl.success("Twój tag został pomyślnie utworzony.", {ttl: 2500});
						return response;
					},
					function (e) {
						errorHandler(e);
					});
		};

		/**
		 * @param tagId
		 * @param eventId
		 * @param page
		 * @returns {*}
		 */
		that.delete = function (tagId, eventId, page) {
			return DataFetcher.Delete('/tag', tagId)
				.then(function (tag) {
						Growl.error("Twój tag został pomyślnie usunięty.", {ttl: 2500});

						return tag;
					},
					function (errors) {
						return errorHandler(errors);
					})
				.then(function () {
					return that.getCollection(true, eventId, page);
				});
		};

		/**
		 * @param tag
		 * @returns {IPromise<>}
		 */
		that.edit = function (tag) {
			return DataFetcher.PUTData('/tag', tag)
				.then(function () {
						Growl.success("Twój tag został pomyślnie edytowany.", {ttl: 2500});
					},
					function (errors) {
						return errorHandler(errors);
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
		.service('TagsManager', TagsManager);

	TagsManager.$inject = [
		'DataFetcher',
		'growl'
	];
})(angular);