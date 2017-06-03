(function (angular) {
	'use strict';

	/**
	 * @param GuestsManager
	 * @param TagsManager
	 * @param $stateParams
	 * @param $scope
	 * @constructor
	 */
	function GuestCreateController(GuestsManager, TagsManager, $stateParams, $scope) {
		let vm = this;
		let eventId = $stateParams.eventId;

		TagsManager.getCollection(false, eventId).then(function (response) {
			$scope.tags = response;
		});

		vm.createGuest = function () {
			let chosenTags = [];
			angular.forEach($scope.guest.tag, function (value, key) {
				if (true === value) {
					chosenTags.push(key);
				}
			});
			$scope.guest.tag = chosenTags;
			GuestsManager.create(Object.assign($scope.guest, {'event': eventId}));
		}
	}

	angular
		.module('eventManagementApp')
		.controller('GuestCreateController', GuestCreateController);

	GuestCreateController.$inject = [
		'GuestsManager',
		'TagsManager',
		'$stateParams',
		'$scope'
	];

})(angular);