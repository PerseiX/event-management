(function (angular) {
	'use strict';

	/**
	 * @param DataFetcher
	 * @param Growl
	 * @constructor
	 */
	function TagsManager(DataFetcher, Growl) {
		var that = this;

		/**
		 * @param page
		 * @param id
		 * @returns {IPromise}
		 */
		that.getCollection = function (page, id) {
			return DataFetcher.GETData('/event/' + id + '/tags', page.page);
		};

		/**
		 * @param tag
		 * @returns {IPromise}
		 */
		that.tagCreate = function (tag) {
			return DataFetcher.Create('/tag', tag)
				.then(function () {
						Growl.success("Twój tag został pomyślnie utworzony.", {ttl: 2500});
						return tag;
					},
					function (e) {
						errorHandler(e);
					});
		};

		/**
		 * @param errors
		 */
		function errorHandler(errors) {
			for (var property in errors.data) {
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