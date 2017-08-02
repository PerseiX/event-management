(function (angular) {
	'use strict';

	/**
	 *
	 * @param $stateParams
	 * @param {EventsManager} EventsManager
	 * @param {$scope} $scope
	 * @param {uiGmapGoogleMapApi} GoogleMapApi
	 * @param {EventPlace} EventPlace
	 * @constructor
	 */
	function EventController($stateParams, EventsManager, $scope, GoogleMapApi, EventPlace) {
		let vm = this;


		$scope.marker = EventPlace.initMarker();
		$scope.map = EventPlace.initMap(18);

		$scope.searchBox = {
			template: 'searchbox.tpl.html',
			events: {
				places_changed: function (searchBox) {
					let places = searchBox.getPlaces();
					let found = EventPlace.updateLocation(places);

					if (true === found) {
						$scope.marker = EventPlace.initMarker();
						$scope.map = EventPlace.initMap(18);
					}
				}
			}
		};


		EventsManager.getSingleResult($stateParams.eventId)
			.then(function (response) {
				EventPlace.updatePlace(response.latitude, response.longitude);
				vm.event = response;
			})
			.then(function () {
				$scope.marker = EventPlace.initMarker();
				$scope.map = EventPlace.initMap(18);

			})
			.then(function () {
				GoogleMapApi.then(function (maps) {
					maps.visualRefresh = true;
				});
			});


		vm.edit = function (event = {}) {
			angular.extend(event, {
				'address': EventPlace.address,
				'latitude': EventPlace.lat,
				'longitude': EventPlace.long
			});

			console.log(event);
			EventsManager.edit(event);
		};

	}

	angular
		.module('eventManagementApp')
		.controller('EventController', EventController);

	EventController.$inject = [
		'$stateParams',
		'EventsManager',
		'$scope',
		'uiGmapGoogleMapApi',
		'EventPlace'
	];

})(angular);