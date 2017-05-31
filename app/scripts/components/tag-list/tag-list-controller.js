(function (angular) {
	'use strict';

	/**
	 * @constructor
	 */
	function TagListController(TagsManager, CONST, $stateParams, $scope) {
		let vm = this;

		let eventId = $stateParams.eventId;

		TagsManager.getCollection(true, eventId).then(function (response) {
			vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
			$scope.response = response;
		});

		$scope.delete = function (tagId, page) {
			TagsManager.delete(tagId, eventId, page).then(function (response) {
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
				$scope.response = response;
			});
		};

		vm.switchPage = function (page) {
			TagsManager.getCollection(false, eventId, page.page).then(function (response) {
				$scope.response = response;
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
			});
		};

		vm.sorting = function () {
			TagsManager.getCollection(false, eventId).then(function (response) {
				vm.total = response.pages * CONST.PAGINATION_ELEMENT_PER_PAGE;
				$scope.response = response;
			});
		};
	}

	angular
		.module('eventManagementApp')
		.controller('TagListController', TagListController);

	TagListController.$inject = [
		'TagsManager',
		'CONST',
		'$stateParams',
		'$scope'
	]
})(angular);