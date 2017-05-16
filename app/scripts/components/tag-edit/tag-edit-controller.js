(function (angular) {
	'use strict';

	/**
	 * @param TagsManager
	 * @param TagsRepository
	 * @param $stateParams
	 * @constructor
	 */
	function TagEditController(TagsManager, TagsRepository, $stateParams) {
		var vm = this;

		vm.tagsRepository = TagsRepository;
		vm.tagId = $stateParams.tagId;

		vm.edit = function () {
			TagsManager.edit(TagsRepository.getTag(vm.tagId));
		}
	}

	angular
		.module('eventManagementApp')
		.controller('TagEditController', TagEditController);

	TagEditController.$inject = [
		'TagsManager',
		'TagsRepository',
		'$stateParams'
	]
})(angular);