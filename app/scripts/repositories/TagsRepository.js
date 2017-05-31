(function (angular) {
	'use strict';

	function TagsRepository() {
		let that = this;

		that.tags = null;

		/**
		 * @param tags
		 * @returns {TagsRepository}
		 */
		that.setTags = function (tags) {
			that.tags = tags;
			return that;
		};

		/**
		 * @returns {TagsRepository|null}
		 */
		that.getTags = function () {
			return that.tags;
		};

		/**
		 * @param tagId
		 */
		that.getTag = function (tagId) {
			return that.tags.find(function (tag) {
				if (tag.id == tagId) {
					return tag;
				}
			});
		};

		/**
		 * @param pages
		 * @returns {TagsRepository}
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
		.service('TagsRepository', TagsRepository);
})(angular);
