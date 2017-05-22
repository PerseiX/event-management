(function (angular) {
	'use strict';

	/**
	 * @param DataFetcher
	 * @param TagsRepository
	 * @param Growl
	 * @constructor
	 */
	function TagsManager(DataFetcher, TagsRepository, Growl) {
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
		 * @param tagId
		 * @returns {IPromise<>}
		 */
		that.delete = function (tagId) {
			return DataFetcher.Delete('/tag', tagId)
				.then(function () {
						return TagsRepository.getTags().find(function (tag, id) {
							if (tag.id === tagId) {
								TagsRepository.getTags().splice(id, 1);
								Growl.error("Twój tag został pomyślnie usunięty.", {ttl: 2500});

								return tag;
							}
						})
					},
					function (errors) {
						return errorHandler(errors);
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
						return event;
					},
					function (errors) {
						return errorHandler(errors);
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
		'TagsRepository',
		'growl'
	];
})(angular);