(function (angular) {
	'use strict';

	/**
	 * @param GuestsManager
	 * @param TagsManager
	 * @param $stateParams
	 * @param $scope
	 * @constructor
	 */
	function GuestController(GuestsManager, TagsManager, $stateParams, $scope) {
		let vm = this;

		let eventId = $stateParams.eventId;
		let guestId = $stateParams.guestId;

		TagsManager.getCollection(false, eventId).then(function (response) {
			$scope.tags = response;
		});

		GuestsManager.getSingleResult(guestId, eventId).then(function (response) {
			$scope.guest = response;
		});
//TODO tag checked
		$scope.edit = function () {
			let chosenTags = [];
			angular.forEach($scope.guest.tag, function (value, key) {
				if (true === value) {
					chosenTags.push(key);
				}
			});
			$scope.guest.tag = chosenTags;
			GuestsManager.edit(Object.assign($scope.guest, {'event': eventId}));
		}
	}

	angular
		.module('eventManagementApp')
		.controller('GuestController', GuestController);

	GuestController.$inject = [
		'GuestsManager',
		'TagsManager',
		'$stateParams',
		'$scope'
	];

})(angular);