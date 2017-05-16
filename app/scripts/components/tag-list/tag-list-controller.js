(function (angular) {
	'use strict';

	/**
	 * @constructor
	 */
	function TagListController(TagsManager, CONST, TagsRepository, $stateParams) {
		var vm = this;

		var eventId = $stateParams.eventId;
		vm.tags = TagsRepository.getTags();
		vm.total = TagsRepository.getPages() * CONST.PAGINATION_ELEMENT_PER_PAGE;
		vm.page = 1;

		vm.switchPage = function (page) {
			TagsManager.getCollection(page, eventId).then(function (collection) {
				vm.tags = collection.collection;
				TagsRepository.setTags(collection.collection);
			});
			vm.page = page.page;
			vm.total = TagsRepository.getPages() * CONST.PAGINATION_ELEMENT_PER_PAGE;
		};

		vm.delete = function (tagId) {
			TagsManager.delete(tagId);
		};
	}

	angular
		.module('eventManagementApp')
		.controller('TagListController', TagListController);

	TagListController.$inject = [
		'TagsManager',
		'CONST',
		'TagsRepository',
		'$stateParams'
	]
})(angular);