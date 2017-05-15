(function (angular) {
	'use strict';

	/**
	 * @param TagsManager
	 * @param $stateParams
	 * @constructor
	 */
	function TagCreateController(TagsManager, $stateParams) {
		var vm = this;

		vm.createTag = function (tag) {
			TagsManager.tagCreate(Object.assign(tag, {'event': $stateParams.eventId}));
		}
	}

	angular
		.module('eventManagementApp')
		.controller('TagCreateController', TagCreateController);

	TagCreateController.$inject = [
		'TagsManager',
		'$stateParams'
	];

})(angular);