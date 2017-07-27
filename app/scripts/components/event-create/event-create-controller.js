(function (angular) {
	'use strict';

	/**
	 * @param EventsManager
	 * @param $scope
	 * @param GoogleMapApi
	 * @param EventPlace
	 * @constructor
	 */
	function EventCreateController(EventsManager, $scope, GoogleMapApi, EventPlace) {
		let vm = this;

		$scope.marker = EventPlace.initMarker();
		$scope.map = EventPlace.initMap();

		$scope.searchBox = {
			template: 'searchbox.tpl.html',
			events: {
				places_changed: function (searchBox) {
					let place = searchBox.getPlaces();

					if (typeof place[0] !== "undefined") {
						let latitude = place[0].geometry.location.lat();
						let longitude = place[0].geometry.location.lng();
						let address = place[0].formatted_address;

						$scope.marker = EventPlace.initMarker();
						$scope.map = EventPlace.initMap(18);

						EventPlace.latitude = latitude;
						EventPlace.longitude = longitude;
						EventPlace.address = address;
					}
				}
			}
		};

		vm.create = function (event = {}) {
			angular.extend(event, {
				'address': EventPlace.address,
				'latitude': EventPlace.latitude,
				'longitude': EventPlace.longitude
			});

			EventsManager.create(event);
		};

		GoogleMapApi.then(function (maps) {
			maps.visualRefresh = true;
		});
	}

	angular
		.module('eventManagementApp')
		.controller('EventCreateController', EventCreateController);

	EventCreateController.$inject = [
		'EventsManager',
		'$scope',
		'uiGmapGoogleMapApi',
		'EventPlace'
	];

})(angular);