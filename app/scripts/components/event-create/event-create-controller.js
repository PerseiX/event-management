(function (angular) {
	'use strict';

	/**
	 *
	 * @param EventsManager
	 * @param $scope
	 * @param GoogleMapApi
	 * @constructor
	 */
	function EventCreateController(EventsManager, $scope, GoogleMapApi) {
		let vm = this;
		vm.manager = EventsManager;

		$scope.marker = {
			id: 0,
			coords: {
				latitude: 52.1676031,
				longitude: 22.2901645
			},
			options: {draggable: true},
			events: {
				dragend: function (marker, eventName, args) {
					var lat = marker.getPosition().lat();
					var lon = marker.getPosition().lng();
				}
			}
		};

		angular.extend($scope, {
			map: {
				center:
					{
						latitude: 52.1676031,
						longitude: 22.2901645
					},
				zoom: 5
			},
			searchbox: {
				template: 'searchbox.tpl.html',
				events: {
					places_changed: function (searchBox) {
						let place = searchBox.getPlaces();
						let latitude = place[0].geometry.location.lat();
						let longitude = place[0].geometry.location.lng();
						console.log("zmiana");
						angular.extend($scope, {
							map: {
								center:
									{
										latitude: latitude,
										longitude: longitude
									},
								zoom: 18
							},
							marker: {
								coords: {
									latitude: latitude,
									longitude: longitude
								}
							}
						});

					}
				}
			}
		});

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
		'uiGmapGoogleMapApi'
	];

})(angular);