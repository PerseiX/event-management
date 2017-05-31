(function (angular) {
	'use strict';

	/**
	 * @param TagsManager
	 * @param $stateParams
	 * @constructor
	 */
	function TagEditController(TagsManager, $stateParams) {
		let vm = this;

		TagsManager.getSingleResult($stateParams.tagId, $stateParams.eventId).then(function (response) {
			vm.tag = response;
		});

		vm.manager = TagsManager;
	}

	angular
		.module('eventManagementApp')
		.controller('TagEditController', TagEditController);

	TagEditController.$inject = [
		'TagsManager',
		'$stateParams'
	]
})(angular);